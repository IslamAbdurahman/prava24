<?php

namespace Database\Seeders;

use App\Models\User\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = [
            [
                'name' => 'Admin',
                'username' => 'admin',
                'email' => 'admin@gmail.com',
                'phone' => '998901234567',
                'password' => Hash::make('123456'), // Always hash passwords
            ],
        ];

        foreach ($admins as $admin) {
            $new_admin = User::query()
                ->updateOrCreate(
                    ['email' => $admin['email']], // unique condition
                    $admin
                );

            $new_admin->assignRole('Admin');
        }

        $clients = [
            [
                'name' => 'Client',
                'username' => 'client',
                'email' => 'client@gmail.com',
                'phone' => '998909876543',
                'password' => Hash::make('123456'), // Always hash passwords
            ],
        ];

        foreach ($clients as $client) {
            $new_client = User::query()
                ->updateOrCreate(
                    ['email' => $client['email']], // unique condition
                    $client
                );

            $new_client->assignRole('Client');
        }

    }
}
