<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends ResourceController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function profile(): JsonResponse
    {
        return response()->json(['data' => Auth::user()]);
    }

    protected function browse(): JsonResponse
    {
        return response()->json(['data' =>  User::all()]);
    }

    protected function read(User $user): JsonResponse
    {
        return response()->json(['data' => $user]);
    }

    protected function edit(User $user): JsonResponse
    {
        $original = $user;

        $validated = request()->validate([
            'name' => ['string', 'min:3'],
            'email' => ['email', Rule::unique('users', 'email')->ignore($user)],
            'current_password' => ['required', 'current_password:api', 'exclude'],
            'password' => ['string', 'regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/', 'min:8', 'confirmed'] //https://stackoverflow.com/a/31549892
        ]);

        if (array_key_exists('password', $validated))
            $validated['password'] = Hash::make($validated['password']);

        $user->update($validated);
        $user->save();

        return response()->json(['original' => $original, 'updated' => $user]);
    }

    protected function add(): JsonResponse
    {
        return response()->json(['user' => User::create(
            request()->validate([
                'name' => ['required', 'string', 'min:3'],
                'email' => ['required', 'email', Rule::unique('users', 'email')],
                'password' => ['required', 'string', 'regex:/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\x])(?=.*[!$#%]).*$/', 'min:8', 'confirmed'] //https://stackoverflow.com/a/31549892
            ])
        )], 201);
    }

    protected function destroy(User $user): JsonResponse
    {
        $user->delete();
        return response()->json(['original' => $user]);
    }
}
