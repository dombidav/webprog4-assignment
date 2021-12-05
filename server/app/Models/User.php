<?php

namespace App\Models;

use App\Traits\ApiResource;
use App\Traits\UsesUuid;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Lumen\Auth\Authorizable;
use Silber\Bouncer\Database\HasRolesAndAbilities;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * @property string id
 * @property string name
 * @property string email
 * @property string password
 */
class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable, HasFactory, UsesUuid, ApiResource, HasRolesAndAbilities;

    protected $fillable = ['name', 'email'];
    protected $appends = ['tasks', 'responsible'];
    protected $hidden = ['password'];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class, 'teams_users');
    }

    public function getTasksAttribute(): Collection|array
    {
        return Task::where('assignee_id', $this->id)->get();
    }

    public function getResponsibleAttribute(): Collection|array
    {
        return Task::where('reporter_id', $this->id)->get();
    }
}
