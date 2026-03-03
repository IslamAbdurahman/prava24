<?php

namespace App\Services\Telegram;

use App\Models\Attempt;
use App\Models\Otp;
use App\Models\User\User;
use Illuminate\Support\Facades\Log;
use Telegram\Bot\Api;
use Telegram\Bot\Keyboard\Keyboard;

class TelegramBotService
{
    protected Api $telegram;
    protected string $webAppUrl = 'https://panel.prava24.uz/dashboard';
    protected string $attemptAppUrl = 'https://panel.prava24.uz/attempts';

    public function __construct()
    {
        $this->telegram = new Api(env('TELEGRAM_BOT_TOKEN'));
        $this->initBotCommands();
    }

    /**
     * Handle bot commands (/start, /help, /ref)
     */
    public function handleCommand(array $update, string $command, int|string $chatId): void
    {
        $parts = explode(' ', $update['message']['text'] ?? '');
        $command = strtolower($parts[0] ?? '');

        match ($command) {
            '/start' => $this->sendWelcomeMessage($update, $chatId),
            '/help' => $this->sendHelpMessage($chatId),
            '/ref' => $this->sendRefMessage($chatId),
            default => $this->sendUnknownCommand($chatId),
        };
    }

    /**
     * Foydalanuvchiga test natijasini Web App ko'rinishida yuborish
     */
    public function sendAttemptInfo(Attempt $attempt)
    {
        try {
            // User va telegram_id mavjudligini tekshiramiz
            if (!$attempt->user || !$attempt->user->telegram_id) {
                return;
            }

            $chatId = $attempt->user->telegram_id;
            $appUrl = rtrim($this->attemptAppUrl, '/') . '/' . $attempt->id;

            $keyboard = Keyboard::make()->inline()->row([
                Keyboard::inlineButton([
                    'text' => "🎓 Natija #$attempt->id",
                    'web_app' => ['url' => $appUrl],
                ]),
            ]);

            // Qo'llab-quvvatlash uchun karta raqami (foydalanuvchi copy qilishi mumkin)
            $supportCard = "💳 Bizni Qo'llab-quvvatlang: \n\n`9860600402432220`\n";

            $message = "✅ *Test yakunlandi!*\n"
                . "To'g'ri javoblar: $attempt->score\n"
                . "Natijangizni ko'rish uchun quyidagi tugmani bosing:\n\n"
                . $supportCard
                . "\nDonat qilishingiz mumkin.";

            $this->sendSafeMessage(
                $chatId,
                $message,
                $keyboard,
                true // parse_mode Markdown (so backticks ishlashi uchun)
            );
        } catch (\Exception $exception) {
            Log::error("Telegram Attempt Info Error: " . $exception->getMessage());
        }
    }


    /* -------------------------------------------------------------------------- */
    /*                                  START                                     */
    /* -------------------------------------------------------------------------- */

    public function sendWelcomeMessage(array $update, int|string $chatId): void
    {
        $from = $update['message']['from'] ?? [];
        $text = $update['message']['text'] ?? '';

        // Deep link payload
        $payload = null;
        if (str_starts_with($text, '/start ')) {
            $payload = trim(str_replace('/start ', '', $text));
        }

        // Agar payload raqam bo‘lsa → referral
        $refTelegramId = is_numeric($payload) ? $payload : null;

        $user = User::firstOrCreate(
            ['telegram_id' => $chatId],
            [
                'name' => trim(($from['first_name'] ?? '') . ' ' . ($from['last_name'] ?? '')),
                'ref_telegram_id' => $refTelegramId,
            ]
        );

        $user->username = $from['username'] ?? null;
        $user->save();

        if ($user->wasRecentlyCreated) {
            $user->assignRole('Client');
        }

        // OTP deep link tekshiramiz
        $isAndroidOtp = $payload === 'is_android_otp';
        $isIosOtp = $payload === 'is_ios_otp';
        $isEmailOtp = $payload === 'is_email_otp';

        if ($isAndroidOtp || $isIosOtp || $isEmailOtp) {
            $this->createAndSendOtp($user, $chatId, [
                'android' => $isAndroidOtp,
                'ios' => $isIosOtp,
                'email' => $isEmailOtp,
            ]);
            return; // welcome message yubormaymiz
        }

        // Oddiy welcome flow
        $this->setPersistentMenuButton();

        $keyboard = Keyboard::make()->inline()->row([
            Keyboard::inlineButton([
                'text' => '🎓 Prava24 ni ochish',
                'web_app' => ['url' => $this->webAppUrl],
            ]),
        ]);

        $this->sendRefMessage($chatId);

        $this->sendSafeMessage(
            $chatId,
            "🚦 Yo‘l harakati qoidalari testlari

Ushbu bot orqali test savollarini ishlashingiz mumkin.

👇 Testni boshlash uchun pastdagi tugmani bosing
",
            $keyboard,
            true
        );
    }


    protected function createAndSendOtp(User $user, int|string $chatId, array $flags = []): void
    {
        // 1. Avval userning aktiv OTP sini tekshiramiz
        $otp = Otp::query()->where('user_id', $user->id)
            ->where('expired', false)
            ->where('expired_at', '>', now())
            ->latest()
            ->first();

        if ($otp) {
            // Muddati o'tmagan — o'zini yuboramiz
            $code = $otp->code;
        } else {
            // 2. Eski OTP larni expired qilamiz
            Otp::query()->where('user_id', $user->id)
                ->where('expired', false)
                ->update(['expired' => true]);

            // 3. Yangi OTP yaratamiz
            $random = random_int(100000, 999999);

            // user_id qo'shib unique qilamiz
            $code = $user->id . $random;

            $otp = Otp::query()->create([
                'user_id' => $user->id,
                'code' => $code,
                'expired_at' => now()->addMinutes(2),
                'expired' => false,
                'is_android' => $flags['android'] ?? false,
                'is_ios' => $flags['ios'] ?? false,
                'is_mobile' => true,
                'is_email' => $flags['email'] ?? false,
            ]);
        }

        $mobile = $flags['android'] ? "Android" : "Iphone";

        $this->sendSafeMessage(
            $chatId,
            "🔐 * $mobile Tasdiqlash kodi*\n\n" .
            "👉 `{$code}`\n\n" . // backtick bilan inline code — copyable bo‘ladi
            "⏳ Kod 2 daqiqa davomida amal qiladi.",
            null,
            true // parse_mode = Markdown
        );
    }

    /* -------------------------------------------------------------------------- */
    /*                                  HELP                                      */
    /* -------------------------------------------------------------------------- */

    protected function sendHelpMessage(int|string $chatId): void
    {
        $this->sendSafeMessage(
            $chatId,
            "📘 Buyruqlar:\n\n/start — Botni qayta ishga tushirish\n/ref — Referral havola\n/help — Yordam",
        );
    }

    /* -------------------------------------------------------------------------- */
    /*                                 REFERRAL                                   */
    /* -------------------------------------------------------------------------- */

    public function sendRefMessage(int|string $chatId): void
    {
        $refLink = "https://t.me/Prava24Bot?start={$chatId}";

        $keyboard = Keyboard::make()->inline()->row([
            Keyboard::inlineButton([
                'text' => '📤 Do‘stlarga ulashish',
                'url' => "https://t.me/share/url?url={$refLink}&text=Prava24 orqali testlarga tayyorlaning 🚦",
            ]),
        ]);

        $this->sendSafeMessage(
            $chatId,
            "🤝 Do‘stlaringizni taklif qiling:\n{$refLink}",
            $keyboard
        );
    }

    /* -------------------------------------------------------------------------- */

    protected function sendUnknownCommand(int|string $chatId): void
    {
        $this->sendSafeMessage($chatId, "❓ Noma'lum buyruq. /help ni yuboring.");
    }

    protected function sendSafeMessage(
        int|string $chatId,
        string     $text,
        ?Keyboard  $keyboard = null,
        bool       $markdown = false
    ): void
    {
        try {
            $params = [
                'chat_id' => $chatId,
                'text' => $text,
            ];

            if ($keyboard) {
                $params['reply_markup'] = $keyboard;
            }

            if ($markdown) {
                $params['parse_mode'] = 'Markdown';
            }

            $this->telegram->sendMessage($params);
        } catch (\Throwable $e) {
            Log::error($e->getMessage());
        }
    }

    protected function setPersistentMenuButton(): void
    {
        try {
            $this->telegram->post('setChatMenuButton', [
                'menu_button' => [
                    'type' => 'web_app',
                    'text' => '🎓 Prava24 ni ochish',
                    'web_app' => [
                        'url' => $this->webAppUrl,
                    ],
                ],
            ]);
        } catch (\Throwable $e) {
            Log::error('Menu button error: ' . $e->getMessage());
        }
    }

    protected function initBotCommands(): void
    {
        try {
            $this->telegram->setMyCommands([
                'commands' => [
                    ['command' => 'start', 'description' => 'Prava24 ni ochish'],
                    ['command' => 'ref', 'description' => 'Referral havola'],
                    ['command' => 'help', 'description' => 'Yordam'],
                ],
            ]);
        } catch (\Throwable $e) {
            Log::error($e->getMessage());
        }
    }
}
