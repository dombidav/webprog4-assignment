<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use  App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
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

            //return successful response
            return response()->json(['user' => $user, 'message' => 'CREATED'], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => 'User Registration Failed!', 'exception' => $e], 409);
        }

    }


}