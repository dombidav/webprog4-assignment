<?php


namespace App\Traits;


use Auth;
use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Silber\Bouncer\BouncerFacade;

/**
 * @property string id
 * @property Carbon created_at
 * @property Carbon updated_at
 * @method static Model|null first()
 * @method static Model|null find(int|string $id)
 * @method static int count()
 * @method static Builder latest()
 * @method static Builder inRandomOrder()
 * @method static Model create(array $validated)
 * @method static Builder where(string $field, mixed $operatorOrEqualsValue, mixed $value = null)
 * @method static Builder whereNotNull(string $field)
 * @method static Builder whereHas(string $connection, Closure $param)
 * @method static LengthAwarePaginator paginate(int $perPage)
 */

trait ApiResource
{
    public static function latestOne(): Model
    {
        return self::latest()->first();
    }

    public static function random(): Model
    {
        return self::inRandomOrder()->first();
    }

    public static function sample(int $number): Collection{
        return self::inRandomOrder()->limit($number)->get();
    }

    public function withPerm(): array
    {
        /** @var Model $this */
        return array_merge_recursive($this->toArray(), [
            'edit' => Auth::check() ? BouncerFacade::can('edit', $this) : false,
            'del' => Auth::check() ? BouncerFacade::can('delete', $this) : false
        ]);
    }

    public function include(array $relations): static
    {
        foreach ($relations as $relation) {
            $relationInstance = $this->$relation();
            if (($relationInstance instanceof BelongsToMany) || ($relationInstance instanceof HasMany) || ($relationInstance instanceof HasManyThrough))
                $this->$relation = $relationInstance->get();
            else
                $this->$relation = $relationInstance->first();
        }
        return $this;
    }

    public static function allWith(array $relations): \Illuminate\Database\Eloquent\Collection|array
    {
        return self::query()->with($relations)->get();
    }
}
