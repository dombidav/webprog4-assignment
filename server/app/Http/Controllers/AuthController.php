<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use  App\Models\User;
use Illuminate\Support\Facades\Auth;
use Silber\Bouncer\BouncerFacade;

class AuthController extends Controller
{
    public function can() {
        BouncerFacade::ownedVia(Project::class, fn($project, $user) => $project->team()->first()->user_id == $user->id);
        BouncerFacade::ownedVia(Task::class, fn(Task $task, $user)
        => $task->project()
                ->with('team')
                ->first()
                ->team
                ->users()
                ->where('users.id', $user->id)
                ->count() > 0
        );

        /** @var User $user */
        $user = User::where('email', request('email'))->first();
        $ability = request('ability');
        $model = request('model');
        $modelId = request('modelId');
        if(!$user) abort(404, 'This email does not exists');
        if(!$ability) abort(404, 'This ability does not exists');
        $actualModel = ('\\App\\Models\\'.$model)::find($modelId);
        if(!$actualModel) abort(404, 'This model with this id does not exists');
        return response()->json(['data' => $user->can($ability, $actualModel)]);
    }

    public function login(Request $request): JsonResponse
    {
        //validate incoming request
        $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $credentials = $request->only(['email', 'password']);
        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unknown email or password mismatch'], 403);
        }

        return $this->respondWithToken($token);
    }

    public function register(Request $request): JsonResponse
    {
        //validate incoming request
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        try {

            $user = new User;
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $plainPassword = $request->input('password');
            $user->password = app('hash')->make($plainPassword);

            $user->save();
            $user->assign('user');
            //return successful response
            return response()->json(['user' => $user, 'message' => 'CREATED'], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => 'User Registration Failed!', 'exception' => $e], 409);
        }

    }


}
