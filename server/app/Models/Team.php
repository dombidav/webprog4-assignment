<?php

namespace App\Models;

use App\Traits\ApiResource;
use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;

/**
 * @property string name,
 * @property Collection users,
 * @property string leader_id
 * @property User leader
 */
class Team extends Model
{
    use UsesUuid, ApiResource;

    protected $fillable = ['name', 'leader_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'teams_users');
    }
}
