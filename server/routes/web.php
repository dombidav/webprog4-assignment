<?php
/** @var $router */

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
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
    $router->post('can', 'AuthController@can');

    $router->get('profile', 'UserController@profile');
    $router->post('teams/membership', 'TeamController@addMemberByEmail');
    $router->delete('teams/membership', 'TeamController@removeMemberByEmail');
});
Routing::ApiRoutes('users', UserController::class);
/** team_id / user_email */
Routing::ApiRoutes('teams', TeamController::class);
Routing::ApiRoutes('projects', ProjectController::class);
Routing::ApiRoutes('tasks', TaskController::class);
