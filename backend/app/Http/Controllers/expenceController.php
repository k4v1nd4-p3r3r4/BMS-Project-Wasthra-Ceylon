<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\expence;
use App\Http\Controllers\Controller;

class expenceController extends Controller
{
    protected $expence;
    public function __construct(){
        $this->expence=new expence();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->expence->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->expence->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $expence=$this->expence->find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $expence = $this->expence->find($id);
        $expence->update($request->all());
        return $expence;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $expence =$this->expence->find($id);
        return $expence->delete();
    }

    public function approve($id)
{
    try {
        $expence = $this->expence->findOrFail($id);
        $expence->status = 'Approved';
        $expence->save();

        return response()->json(['message' => 'Expense approved successfully']);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    
}
