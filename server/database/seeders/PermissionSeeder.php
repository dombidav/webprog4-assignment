<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Silber\Bouncer\BouncerFacade;

class PermissionSeeder extends Seeder
{
    public function run(){
        BouncerFacade::allow('admin')->everything();
        BouncerFacade::allow('user')->toOwn(Team::class);
        BouncerFacade::ownedVia(Project::class, fn($project, $user) => $project->team()->first()->user_id == $user->id);
        BouncerFacade::allow('user')->toOwn(Project::class);
        BouncerFacade::ownedVia(Task::class, fn(Task $task, $user)
            => $task->project()
                ->with('team')
                ->first()
                ->team
                ->users()
                ->where('id', $user->id)
                ->count() > 0
        );
        BouncerFacade::allow('user')->toOwn(Task::class);
        BouncerFacade::allow('moderator')->everything();
        BouncerFacade::forbid('moderator')->toManage(User::class);
        BouncerFacade::forbid('banned')->everything();

        User::all()->each(fn(User $user) => $user->assign('user'));
    }
}
