<?php

namespace App\Models;

use App\Traits\ApiResource;
use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * @property string name
 * @property string description
 * @property Collection<Task> subtasks
 * @property string parent_id
 * @property Task parent
 * @property string project_id
 * @property Project project
 * @property string assignee_id
 * @property User assignee
 * @property string reporter_id
 * @property User reporter
 * @property integer status (0 - Backlog ; 1 - In Progress ; 2 - Review ; 3 - Done)
 * @property integer count
 */
class Task extends Model
{
    use UsesUuid, ApiResource;

    protected $fillable = ['name', 'description', 'parent_id', 'project_id', 'reporter_id', 'assignee_id'];

    public function subtasks(): HasMany
    {
        return $this->hasMany(Task::class, 'parent_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'parent_id');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    public static function create(array $validated): static
    {
        $task = new Task($validated);
        $maxCount = Task::query()->where('project_id', $task->project_id)->max('count');
        $task->count = $maxCount + 1;
        $task->save();
        return $task;
    }
}
