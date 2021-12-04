<?php
/** @var $router */

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UserController;
use App\Utils\Routing;

Routing::$router = $router;

$router->get('/', function () use ($router) {
    return $router->app->version();
});

// API route group
$router->group(['prefix' => 'api'], function () use ($router) {
    $router->post('register', 'AuthController@register');
    $router->post('login', 'AuthController@login');

    $router->get('profile', 'UserController@profile');
});
Routing::ApiRoutes('users', UserController::class);
/** team_id / user_email */
$router->post('teams/membership/{id}/{email}', 'TeamController@addMember');
$router->delete('teams/membership/{id}/{email}', 'TeamController@removeMember');
Routing::ApiRoutes('teams', TeamController::class);
Routing::ApiRoutes('projects', ProjectController::class);
