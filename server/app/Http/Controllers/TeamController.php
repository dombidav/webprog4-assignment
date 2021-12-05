<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class TeamController extends ResourceController
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['browse', 'read']]);
    }

    protected function browse(): JsonResponse
    {
        return response()->json(['data' => Team::query()->with(['users', 'user'])->get()]);
    }

    protected function read(Team $team): JsonResponse
    {
        $team->user = $team->user()->first();
        $team->users = $team->users()->get();
        return response()->json(['data' => $team]);
    }

    protected function edit(Team $team): JsonResponse
    {
        $original = $team;

        $validated = $this->validation([
            'name' => ['min:3', 'regex:/[a-zA-Z0-9-_ ]+/'],
            'user_id' => ['required', Rule::exists('users', 'id')]
        ]);

        $team->update($validated);
        $team->save();

        return response()->json(['original' => $original, 'updated' => $team]);
    }

    protected function add(): JsonResponse
    {
        $team = Team::make($this->validation([
            'name' => ['min:3', 'regex:/[a-zA-Z0-9-_ ]+/'],
            'user_id' => ['required', Rule::exists('users', 'id')]
        ]));
        $team->user_id = request('user_id');
        $team->save();
        return response()->json(['data' => $team ], 201);
    }

    protected function destroy(Team $team): JsonResponse
    {
        $team->delete();
        return response()->json(['original' => $team]);
    }

    protected function addMemberByEmail(): JsonResponse
    {
        /** @var User $user */
        $user = User::where('email', request('email'))->first();
        /** @var Team $team */
        $team = Team::where('id', request('team'))->first();
        if(!$user) abort(404, 'This email does not exists');
        if(!$team) abort(404, 'This team does not exists');
        return $this->addMember($team, $user);
    }

    protected function removeMemberByEmail(): JsonResponse
    {
        /** @var User $user */
        $user = User::where('email', request()->query('email'))->first();
        /** @var Team $team */
        $team = Team::where('id', request()->query('team'))->first();
        if(!$user) abort(404, 'This email does not exists');
        if(!$team) abort(404, 'This team does not exists');
        return $this->removeMember($team, $user);
    }

    protected function addMember(Team $team, User $user): JsonResponse
    {
        $team->users()->attach($user);
        $team->save();
        $team->refresh();
        $team->user = $team->user()->first();
        $team->users = $team->users()->get();
        return response()->json(['data' => $team]);
    }

    protected function removeMember(Team $team, User $user): JsonResponse
    {
        $team->users()->detach($user);
        $team->save();
        $team->refresh();
        $team->user = $team->user()->first();
        $team->users = $team->users()->get();
        return response()->json(['data' => $team]);
    }
}
