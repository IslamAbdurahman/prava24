<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use danog\MadelineProto\API;
use danog\MadelineProto\Settings;
use Illuminate\Support\Facades\Http;

class TelegramHumoListener extends Command
{
    protected $signature = 'telegram:humo';
    protected $description = 'Listen only HUMOcardbot messages';

    public function handle()
    {
        $settings = new Settings([
            'app_info' => [
                'api_id' => 31905651,
                'api_hash' => 'af07708d533a7ae1a80eadfd977a4cc5',
            ],
        ]);

        $MadelineProto = new API(storage_path('app/session.madeline'), $settings);
        $MadelineProto->start();

        $this->info("Bot ishga tushdi. @HUMOcardbot (856254490) xabarlari kutilmoqda...");

        $offset = 0;
        $humoBotId = 856254490; // Faqat shu ID dan kelgan xabarlarni olamiz

        while (true) {
            try {
                $updates = $MadelineProto->getUpdates(['offset' => $offset, 'limit' => 50, 'timeout' => 0]);

                foreach ($updates as $update) {
                    $offset = $update['update_id'] + 1;

                    // Xabar obyekti borligini tekshirish
                    if (isset($update['update']['message']['message'])) {

                        $messageData = $update['update']['message'];
                        $message = $messageData['message'];

                        // Xabar yuborgan foydalanuvchi ID sini aniqlash
                        $fromId = $messageData['from_id']['user_id'] ?? null;

                        // FILTR: Faqat HUMOcardbot ID ga teng bo'lsa davom etadi
                        if ($fromId == $humoBotId) {

                            $this->info("HumoBot dan yangi xabar: " . $message);

                            if (str_contains($message, "To'ldirish")) {
                                preg_match('/➕\s([\d\.,\s]+)\sUZS/', $message, $sumMatch);

                                if (!empty($sumMatch[1])) {
                                    $amount = preg_replace('/[^\d]/', '', $sumMatch[1]);

                                    Http::post('https://panel.prava24.uz/api/humo/webhook', [
                                        'amount' => $amount, // Odatda so'mda keladi, /100 kerak bo'lsa kodingizga qarab qo'shasiz
                                        'text' => $message,
                                        'bot_id' => $fromId
                                    ]);

                                    $this->info("Webhook yuborildi: $amount UZS");
                                }
                            }
                        }
                    }
                }
            } catch (\Exception $e) {
                $this->error("Xato: " . $e->getMessage());
                sleep(5);
            }

            usleep(500000);
        }
    }
}
