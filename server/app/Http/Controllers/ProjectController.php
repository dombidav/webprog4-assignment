<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class ProjectController extends ResourceController
{
    public function __construct()
    {
        $this->middleware('auth', ['except' => ['read']]);
    }

    protected function browse(): JsonResponse
    {
        return response()->json(['data' => Project::all()]);
    }

    protected function read(Project $project): JsonResponse
    {
        return response()->json(['data' => $project]);
    }

    protected function edit(Project $project): JsonResponse
    {
        $original = $project;

        $validated = request()->validate([
            'name' => ['min:3', 'regex:[a-zA-Z0-9-_ ]+'],
            'shortname' => ['min:2', 'regex:[a-zA-Z0-9-_]+'],
            'description' => [],
            'team_id' => [Rule::exists('teams', 'id')]
        ]);

        $project->update($validated);
        $project->save();

        return response()->json(['original' => $original, 'updated' => $project]);
    }

    protected function add(): JsonResponse
    {
        return response()->json(['data' => Project::create(request()->validate([
               'name' => ['required', 'min:3', 'regex:[a-zA-Z0-9-_ ]+'],
               'shortname' => ['required', 'min:2', 'regex:[a-zA-Z0-9-_]+'],
               'description' => [],
               'team_id' => ['required', Rule::exists('teams', 'id')]
            ])
        )], 201);
    }

    protected function destroy(Project $project): JsonResponse
    {
        $project->delete();
        return response()->json(['original' => $project]);
    }
}
