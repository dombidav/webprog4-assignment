<?php

namespace App\Models;

use App\Traits\ApiResource;
use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * @property string name
 * @property string shortname
 * @property string description
 * @property Team team
 * @property string team_id
 * @property Collection<Task> tasks
 */
class Project extends Model
{
    use UsesUuid, ApiResource;

    protected $fillable = ['name', 'shortname', 'description', 'team_id'];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
