<?php

namespace App\Http\Controllers\Api;
use App\Models\Manufood;
use App\Models\Foodlist;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ManufoodController extends Controller
{
// Retrieve all items from the Manufood model and order them by 'manu_id' in descending order  
    public function manufoodlist(){
        $manufood = Manufood::orderBy('manu_id', 'desc')->get();
        if ($manufood->count() > 0) {
            return response()->json([
                'status' => 200,
                'data' => $manufood
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Food items not found'
            ], 404);
        }
    }
    
 //Function for updating details manufactired foods   
    public function manufoodStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'food_id' => 'required',
            'qty' => 'required|numeric',
            'date' => 'required|date|before_or_equal:today',
            'exp_date' => 'required|date|after:today',
        ], [
            'qty.numeric' => 'Quantity must be a number',
            'exp_date.after' => 'Expiration date must be in the future',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            $manufood = Manufood::create([
                'food_id' => $request->food_id,
                'qty' => $request->qty,
                'date' => $request->date,
                'exp_date' => $request->exp_date,
            ]);
    
            // Update foodlist qty
            $foodlist = Foodlist::where('food_id', $request->food_id)->first();
            if ($foodlist) {
                $foodlist->qty += $request->qty; // Increase qty by the amount provided
                $foodlist->save(); // Save the updated qty
            }
    
            if ($manufood) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Manufood item added successfully',
                    'data' => $manufood
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Something went wrong'
                ], 500);
            }
        }
    }
 // Retrieve the manufood item with the specified manu_id  
    public function manufoodShow($manufood_id){
        $manufood  = Manufood::where('manu_id', $manufood_id)->first();
        if ($manufood){
            return response()->json([
               'status' => 200,
                'manufood' =>  $manufood 
            ], 200);

        } else {
            return response()->json([
               'status' => 404,
               'message' => 'Food items not found'
            ], 404);
        }
    }

    public function manufoodedit($manufood_id){
        $manufood = Manufood::where('manu_id', $manufood_id)->first();
        if ($manufood){
            return response()->json([
               'status' => 200,
               'manufood' =>  $manufood 
            ], 200);

        } else {
            return response()->json([
               'status' => 404,
               'message' => 'Food items not found'
            ], 404);
        }
    }
    
    
    public function manufoodupdate(Request $request, $manufood_id)
    {
        $validator = Validator::make($request->all(), [
            'food_id' => 'required',
            'qty' => 'required|numeric',
            'date' => 'required|date|before_or_equal:today',
            'exp_date' => 'required',
        ], [
            'qty.numeric' => 'Quantity must be a number',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            // Retrieve the old quantity of the manufood item
            $oldManufood = Manufood::find($manufood_id);
            $oldQty = $oldManufood->qty;
    
            // Update the manufood item
            $manufood = Manufood::where('manu_id', $manufood_id)->update([
                'food_id' => $request->food_id,
                'qty' => $request->qty,
                'date' => $request->date,
                'exp_date' => $request->exp_date
            ]);
    
            // Calculate the difference in quantity
            $qtyDifference = $request->qty - $oldQty;
    
            // Update the quantity in the foodlist table
            $foodlist = Foodlist::where('food_id', $request->food_id)->first();
            if ($foodlist) {
                $foodlist->qty += $qtyDifference;
                $foodlist->save();
            }
    
            if ($manufood) {
                return response()->json([
                    'status' => 200,
                    'message' => "Food item updated successfully!"
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Something went wrong'
                ], 404);
            }
        }
    }
 //Function for deleeting the items   
        public function manufooddestroy($manufood_id){
            $manufood = Manufood::where('manu_id', $manufood_id)->first();
            if($manufood){
                $manufood->delete();
                return response()->json([
                   'status' => 200,
                   'message' => 'Food item deleted successfully'
                ], 200);
            }
            else{
                return response()->json([
                   'status' => 404,
                   'message' => 'Something went wrong'
                ], 404);
            }
        }
        
        
        }