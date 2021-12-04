<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /** @var array */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    public function render($request, Throwable $e): \Illuminate\Http\Response|JsonResponse|Response
    {
        $rendered = parent::render($request, $e);

        return response()->json([
            'error' => [
                'code' => $rendered->getStatusCode(),
                'message' => $e->getMessage(),
            ]
        ], $rendered->getStatusCode());
    }
}
