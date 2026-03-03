<?php

namespace App\Observers;

use App\Models\Attempt;
use App\Services\Telegram\TelegramBotService;

class AttemptObserver
{
    public function __construct(TelegramBotService $telegramService)
    {
        $this->telegramService = $telegramService;
    }

    public function created(Attempt $attempt): void
    {
    }

    public function updated(Attempt $attempt): void
    {
        try {
            if ($attempt->score > 0) {
                $this->telegramService->sendAttemptInfo($attempt);
            }
        } catch (\Exception $exception) {
            telegramlog($exception->getMessage());
        }
    }

    public function deleted(Attempt $attempt): void
    {
    }

    public function restored(Attempt $attempt): void
    {
    }

    public function forceDeleted(Attempt $attempt): void
    {
    }
}
