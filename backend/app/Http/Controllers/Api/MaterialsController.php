<?php

namespace App\Http\Controllers\Api;

use App\Models\Materials;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class MaterialsController extends Controller
{
 // Retrieve all materials from the Materials model
    public function index()
    {
        $materials = Materials::all();
        if ($materials->count() > 0) {
            return response()->json([
                'status' => 200,
                'materials' => $materials
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No materials found'
            ], 404);
        }
    }

    public function store(Request $request)
{
//validating incoming requests
    $validator = Validator::make($request->all(), [
        'material_id' => ['required', 'regex:/^M\d{3}$/', 'unique:materials,material_id'],
        'material_name' => 'required|regex:/[a-zA-Z]/|max:100',
        'category' => 'required',
        'initial_qty' => 'required|numeric',
        'unit' => 'required'
    ], [
        'material_id.regex' => 'Material ID should start with M followed by three digits (e.g., M001)',
        'material_id.unique' => 'Material ID already exists',
        'material_name.regex' => 'Material name must contain at least one letter',
        'initial_qty.numeric' => 'Initial quantity must be a number'
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'message' => $validator->messages()
        ], 422);
    }

    // Calculate available_qty by adding initial_qty and the quantity being added
    $available_qty = $request->initial_qty;

    // Create a new instance of Materials model
    $material = Materials::create([
        'material_id'=> $request->material_id,
        'material_name'=> $request->material_name,
        'category' => $request->category,
        'initial_qty'=> $request->initial_qty,
        'available_qty'=> $available_qty, // Assign the calculated available_qty
        'unit'=> $request->unit
    ]);

    if ($material) {
        return response()->json([
            'status' => 200,
            'message' => 'Material added successfully',
            'material' => $material
        ], 200);
    } else {
        return response()->json([
            'status' => 500,
            'message' => 'Failed! Something went wrong!'
        ], 500);
    }
}

// // Retrieve the material with the specified material_id
public function show($material_id){
    $material = Materials::where('material_id', $material_id)->first();
    
    if ($material){
        return response()->json([
            'status' => 200,
            'material' => $material
        ], 200);
    }
    else{
        return response()->json([
            'status' => 404,
            'message' => 'Failed! Record Not found!'
        ], 404);
    }
}
 //Edit the material with the specified material_id
public function edit($material_id){
    $material = Materials::where('material_id', $material_id)->first();
    
    if ($material){
        return response()->json([
            'status' => 200,
            'material' => $material
        ], 200);
    }
    else{
        return response()->json([
            'status' => 404,
            'message' => 'Failed! Record Not found!'
        ], 404);
}

        
    }

 //Updating details   
    public function update(Request $request, $material_id){

        $validator = Validator::make($request->all(), [
            'material_id' => ['required', 'regex:/^M\d{3}$/'],
            'material_name' => 'required|regex:/[a-zA-Z]/|max:100',
            'category' => 'required',
            'initial_qty' => 'required|numeric',
            'unit' => 'required'
        ], [
            'material_id.regex' => 'Material ID should start with M followed by three digits (e.g., M001)',
            'material_name.regex' => 'Material name must contain at least one letter',
            'initial_qty.numeric' => 'Initial quantity must be a number'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            
            $material = Materials::where('material_id', $material_id)->first();
    
            if ($material) {
                // Calculate the difference in initial_qty
                $initial_qty_difference = $request->initial_qty - $material->initial_qty;
                
                // Update the material
                $material->update([
                    'material_id'=> $request->material_id,
                    'material_name'=> $request->material_name,
                    'category'=>$request->category,
                    'initial_qty'=> $request->initial_qty,
                    'unit'=> $request->unit
                ]);
                
                // Update available_qty
                $this->updateAvailableQuantity($material_id, $initial_qty_difference);
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Material updated successfully',
                    'material' => $material
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Failed! Material not found!'
                ], 404);
            }
        }
    }
    

    public function destroy($material_id){
    
        $material = Materials::where('material_id', $material_id)->first();

        if($material){

            $material->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Material deleted successfully',
                
            ], 200);
        }
        else{
            return response()->json([
                'status' => 404,
                'message' => 'Failed! Something went wrong!'
            ], 404);
        }
    }

    public function updateAvailableQuantity($material_id, $quantityChange)
{
    $material = Materials::where('material_id', $material_id)->first();

    if ($material) {
        // Update the available_qty by adding the quantity change
        $material->available_qty += $quantityChange;
        $material->save();

        return response()->json([
            'status' => 200,
            'message' => 'Available quantity updated successfully',
            'material' => $material
        ], 200);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'Material not found'
        ], 404);
    }
}
}