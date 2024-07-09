<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use App\Models\Usagematerials;
use App\Models\Materials;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UsageController extends Controller
{
   
    public function usageMaterials(){
        $usage = Usagematerials::orderBy('usage_id', 'desc')->get();
        if ($usage->count() > 0) {
            return response()->json([
                'status' => 200,
                'usage' => $usage
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No records found'
            ], 404);
        }
    }
    
    public function usageStore(Request $request)
{
    // Validate the request data
    $validator = Validator::make($request->all(), [
        'material_id' => 'required',
        'date' => 'required|date|before_or_equal:today',
        'usage_qty' => 'required|numeric',
    ], [
        'usage_qty.numeric' => 'Usage quantity must be a number',
    ]);

    // Check if validation fails
    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'message' => $validator->messages(),
        ], 422);
    }

    // Retrieve material information
    $material = Materials::where('material_id', $request->material_id)->first();

    // Check if material exists
    if (!$material) {
        return response()->json([
            'status' => 404,
            'message' => 'Material not found',
        ], 404);
    }

    // Check if usage quantity exceeds available quantity
    if ($request->usage_qty > $material->available_qty) {
        $validator->errors()->add('usage_qty', 'Usage quantity exceeds available quantity. Check balance.');
        return response()->json([
            'status' => 422,
            'message' => $validator->messages(),
        ], 422);
    }

    // Create a new instance of Usagematerials model
    $usage = Usagematerials::create([
        'material_id' => $request->material_id,
        'date' => $request->date,
        'usage_qty' => $request->usage_qty,
    ]);

    // Update available quantity of the material
    $material->available_qty -= $request->usage_qty;
    $material->save();

    return response()->json([
        'status' => 200,
        'message' => 'Usage quantity added successfully',
        'usage' => $usage,
    ], 200);
}

    
    public function usageShow($usage_id){
        $usage = Usagematerials::find($usage_id);
        if ($usage) {
            return response()->json([
                'status' => 200,
                'usage' => $usage
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
               'message' => 'No records found'
            ], 404);
        }
    }

    public function usageedit($usage_id){

        $usage = Usagematerials::find($usage_id);
        if ($usage) {
            return response()->json([
                'status' => 200,
                'usage' => $usage
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
               'message' => 'No records found'
            ], 404);
        }
    }
    public function usageupdate(Request $request, int $usage_id) {
        $validator = Validator::make($request->all(), [
            'material_id' => 'required',
            'date' => 'required|date|before_or_equal:today',
            'usage_qty' => 'required|numeric'
        ], [
            'usage_qty.numeric' => 'Usage quantity must be a number'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            $usage = Usagematerials::find($usage_id);
    
            if ($usage) {
                $original_qty = $usage->usage_qty; // Get the original usage quantity
    
                // Update the usage details
                $usage->update([
                    'material_id' => $request->material_id,
                    'date' => $request->date,
                    'usage_qty' => $request->usage_qty,
                ]);
    
                // Calculate the difference between the original and updated quantities
                $qty_difference = $request->usage_qty - $original_qty;
    
                // Update the available_qty in the Materials table
                $materialsController = new MaterialsController();
                $materialsController->updateAvailableQuantity($request->material_id, -$qty_difference);
    
                return response()->json([
                    'status' => 200,
                    'message' => 'Usage updated successfully',
                    'usage' => $usage
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Failed! Something went wrong!'
                ], 404);
            }
        }
    }
    
    
    
        public function usagedestroy($usage_id){

            $usage = Usagematerials::find($usage_id);

            if($usage){

                $usage->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Deleted successfully',
                    
                ], 200);
            }
            else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Failed! Something went wrong!'
                ], 404);
            }
        }
    
        }
    
    

