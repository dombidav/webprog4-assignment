<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use ReflectionClass;
use ReflectionException;

abstract class ResourceController extends Controller
{
    public function __call(string $name, array $arguments)
    {
        try {
            $reflectionClass = new ReflectionClass($this::class);
            $reflectionFunc = $reflectionClass->getMethod($name);
            $reflectionFunc->setAccessible(true);
            $reflectionParams = $reflectionFunc->getParameters();
            $args = array_slice($arguments, 1);
            $keys = array_keys(request()->route()[2]);
            for ($i = 0; $i < count($reflectionParams); $i++) {
                $reflectionType = $reflectionParams[$i]->getType();
                if(is_subclass_of($reflectionType->getName(), Model::class))
                    $args[$i] = $reflectionType->getName()::where($keys[$i], urldecode($args[$i]))->first()
                    or abort(404, 'Model not found');
            }
            return $reflectionFunc->invoke($this, ...$args);
        } catch (ReflectionException $e) {
            abort(500, $e->getMessage());
        }
    }

    protected function validation(array $rules): array
    {
        return $this->validate(request(), $rules);
    }
}
