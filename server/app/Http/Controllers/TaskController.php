<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class TaskController extends ResourceController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    protected function browse(): JsonResponse
    {
        return response()->json(['data' => Task::allWith(['subtasks', 'parent', 'project', 'assignee', 'reporter'])->map(fn(Task $task) => $task->withPerm())]);
    }

    protected function read(Task $task): JsonResponse
    {
        return response()->json(['data' => $task->include(['subtasks', 'parent', 'project', 'assignee', 'reporter'])->withPerm()]);
    }

    protected function edit(Task $task): JsonResponse
    {
        $original = $task;

        $validated = $this->validation([
            'name' => ['min:3', 'regex:/[a-zA-Z0-9-_ ]+/'],
            'description' => [],
            'parent_id' => [], // [Rule::exists('tasks', 'id')],
            'project_id' => [Rule::exists('projects', 'id')],
            'assignee_id' => [], //[Rule::exists('users', 'id')],
            'reporter_id' => [], //[Rule::exists('users', 'id')],
            'status' =>[], //['numeric', 'min:0', 'max:4']
        ]);

        $task->update($validated);
        $task->status = request('status');
        $task->save();

        return response()->json(['original' => $original, 'updated' => $task]);
    }

    protected function add(): JsonResponse
    {
        $task = Task::make($this->validation([
               'name' => ['required', 'min:3', 'regex:/[a-zA-Z0-9-_ ]+/'],
               'description' => [],
               'parent_id' => [], //[Rule::exists('tasks', 'id')],
               'project_id' => ['required', Rule::exists('projects', 'id')],
               'assignee_id' => [],// [Rule::exists('users', 'id')],
               'reporter_id' => [], //[Rule::exists('users', 'id')],
               'status' => [], //['numeric', 'min:0', 'max:4']
           ])
        );
        $task->project_id = request('project_id');
        $task->count = Task::query()->where('project_id', $task->project_id)->max('count') + 1;
        $task->save();
        return response()->json(['data' => $task], 201);
    }

    protected function destroy(Task $task): JsonResponse
    {
        $task->delete();
        return response()->json(['original' => $task]);
    }
}
