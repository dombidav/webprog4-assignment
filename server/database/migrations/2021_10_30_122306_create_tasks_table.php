<?php

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    public function up() {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('description')->default('');
            $table->foreignIdFor(Task::class, 'parent_id')->nullable();
            $table->foreignIdFor(Project::class);
            $table->foreignIdFor(User::class, 'assignee_id')->nullable();
            $table->foreignIdFor(User::class, 'reporter_id')->nullable();
            $table->tinyInteger('status')->default(0);
            $table->bigInteger('count');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('tasks');
    }
}
