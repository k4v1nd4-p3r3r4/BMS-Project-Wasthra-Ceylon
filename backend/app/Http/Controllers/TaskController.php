<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    protected $task;
    public function __construct()
    {
        $this->task = new Task();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->task->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->task->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = $this->task->find($id);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $task = $this->task->find($id);
        $task->update($request->all());
        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = $this->task->find($id);

        return $task->delete();
    }
}
