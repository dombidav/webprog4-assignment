<?php

namespace App\Utils;

use Illuminate\Support\Str;
use Laravel\Lumen\Routing\Router;

class Routing
{
    static Router $router;

    public static function ApiRoutes(string $name, string $controller){
        $controller = Str::afterLast($controller, '\\');
        self::$router->group(['prefix' => 'api'], function () use ($name, $controller) {
            self::$router->get("$name/{id}", "$controller@read");
            self::$router->put("$name/{id}", "$controller@edit");
            self::$router->delete("$name/{id}", "$controller@destroy");
            self::$router->get("$name", "$controller@browse");
            self::$router->post("$name", "$controller@add");
        });
    }
}
