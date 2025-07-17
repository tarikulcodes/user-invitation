<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name'              => 'Admin User',
            'email'             => 'admin@test.com',
            'password'          => Hash::make('password'),
            'email_verified_at' => now(),
            'role'              => 'admin',
        ]);

        User::factory()->create([
            'name'              => 'User',
            'email'             => 'user@test.com',
            'password'          => Hash::make('password'),
            'email_verified_at' => now(),
            'role'              => 'user',
        ]);
    }
}
