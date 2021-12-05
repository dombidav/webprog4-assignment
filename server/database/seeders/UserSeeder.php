<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /** @noinspection PhpUndefinedMethodInspection */
    public function run(){
        User::factory()->create(['email' => 'admin@example.test', 'name' => 'Site Admin'])->assign('admin');
        User::factory()->create(['email' => 'moderator@example.test', 'name' => 'Site Moderator'])->assign('moderator');
        User::factory()->create(['email' => 'banned@example.test', 'name' => 'Banned User'])->assign('banned');
        User::factory()->create(['email' => 'user@example.test', 'name' => 'Test User'])->assign('user');

        User::factory(17)->create();
    }
}
