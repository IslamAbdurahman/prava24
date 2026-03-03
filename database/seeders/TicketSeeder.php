<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Ticket;
use App\Models\Question;
use App\Models\Answer;

class TicketSeeder extends Seeder
{
    public function run(): void
    {
        $jsonFile = base_path('database/data/tickets.json');
        $tickets = json_decode(file_get_contents($jsonFile), true);

        DB::transaction(function () use ($tickets) {

            foreach ($tickets as $ticketData) {

                // 1️⃣ Ticket
                $ticket = Ticket::create([
                    'title'       => $ticketData['title'],
                    'description' => $ticketData['description'] ?? '',
                    'is_active'   => $ticketData['is_active'] ?? 1,
                ]);

                // 2️⃣ Questions
                foreach ($ticketData['questions'] as $questionData) {

                    $question = $ticket->questions()->create([
                        'content'   => $questionData['content'],
                        'image_url' => $questionData['image_url'] ?? null,
                    ]);

                    // 3️⃣ Answers
                    foreach ($questionData['answers'] as $answerData) {

                        $question->answers()->create([
                            'content'    => $answerData['content'],
                            'is_correct' => $answerData['is_correct'],
                        ]);
                    }
                }
            }

        });
    }
}
