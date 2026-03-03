<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Artisan::command('attempts:auto-submit', function () {
    $service = app(\App\Services\AttemptAutoSubmitService::class);
    $count = $service->handle();
    $this->info("Submitted {$count} attempts.");
    \Illuminate\Support\Facades\Log::info("CRON: Submitted {$count} attempts at " . now());
})->describe('Auto submit all expired attempts');
