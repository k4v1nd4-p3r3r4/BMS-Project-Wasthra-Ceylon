<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salaries;
use App\Http\Controllers\Controller;

class SalariesController extends Controller
{

    protected $salaries;
    public function __construct(){
        $this->salaries=new Salaries();
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->salaries->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return $this->salaries->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    $salaries = $this->salaries->find($id);
    return response()->json($salaries); // Ensure data is returned as JSON
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    $salary = $this->salaries->find($id);
    if (!$salary) {
        return response()->json(['error' => 'Salary not found'], 404);
    }

    $salary->update($request->all());
    return response()->json($salary);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $salaries =$this->salaries->find($id);
        return $salaries->delete();
    }
}
