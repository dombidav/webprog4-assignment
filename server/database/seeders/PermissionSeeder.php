<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Silber\Bouncer\Bouncer;
use Silber\Bouncer\BouncerFacade;

class PermissionSeeder extends Seeder
{
    public function run(){
        BouncerFacade::allow('admin')->everything();
        BouncerFacade::allow('moderator')->everything();
        BouncerFacade::forbid('moderator')->toManage(User::class);
        BouncerFacade::forbid('banned')->everything();
    }
}
