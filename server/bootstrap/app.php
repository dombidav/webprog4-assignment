<?php

require_once __DIR__.'/../vendor/autoload.php';

(new Laravel\Lumen\Bootstrap\LoadEnvironmentVariables(
    dirname(__DIR__)
))->bootstrap();

date_default_timezone_set(env('APP_TIMEZONE', 'UTC'));

$app = new Laravel\Lumen\Application(
    dirname(__DIR__)
);

$app->instance('path.config', app()->basePath() . DIRECTORY_SEPARATOR . 'config');
$app->instance('path.storage', app()->basePath() . DIRECTORY_SEPARATOR . 'storage');

 $app->withFacades();

 $app->withEloquent();

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->configure('app');
$app->configure('cors');

 $app->routeMiddleware([
     'auth' => App\Http\Middleware\Authenticate::class,
 ]);

 $app->register(App\Providers\AppServiceProvider::class);
 $app->register(App\Providers\AuthServiceProvider::class);
 $app->register(App\Providers\EventServiceProvider::class);
 $app->register(Irazasyed\Larasupport\Providers\ArtisanServiceProvider::class);
 $app->register(Tymon\JWTAuth\Providers\LumenServiceProvider::class);
 $app->register(Silber\Bouncer\BouncerServiceProvider::class);
 $app->register(Fruitcake\Cors\CorsServiceProvider::class);


 $app->middleware([
     Fruitcake\Cors\HandleCors::class,
 ]);

$app->router->group([
    'namespace' => 'App\Http\Controllers',
], function ($router) {
    require __DIR__.'/../routes/web.php';
});


return $app;
