<?php

namespace Database\Seeders;

use App\Models\Users;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        Users::query()->updateOrCreate(['email' => 'admin@flatlogic.com'], [
            'firstName' => 'firstName',
            'lastName' => 'lastName',
            'phoneNumber' => '1234567890',
            'emailVerified' => true,
            'password' => Hash::make('password')
        ]);
    }
}
