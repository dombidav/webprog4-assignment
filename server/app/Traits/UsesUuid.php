<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

trait UsesUuid
{
    public static function boot()
    {
        parent::boot();
        self::creating(function (Model $model) {
            $model->id = Str::uuid()->toString();
        });
    }

    public function getIncrementing(): bool
    {
        return false;
    }

    public function getKeyName(): string
    {
        return 'id';
    }

    public function getKeyType(): string
    {
        return 'string';
    }
}
