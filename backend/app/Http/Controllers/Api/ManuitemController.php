<?php

namespace App\Http\Controllers\Api;
use App\Models\Manuitems;
use App\Models\Handlist;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ManuitemController extends Controller
{
 // Retrieve all items from the Manuitems model and order them by 'manu_id' in descending order  
    public function manuitemslist(){
        $manuitems = Manuitems::orderBy('manu_id', 'desc')->get();
        if ($manuitems->count() > 0) {
            return response()->json([
                'status' => 200,
                'data' => $manuitems
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Items not found'
            ], 404);
        }
    }
    

    public function manuitemStore(Request $request)
    {
  // Validate the incoming request data       
        $validator = Validator::make($request->all(), [
            'item_id' => 'required',
            'qty' => 'required|numeric',
            'date' => 'required|date|before_or_equal:today',
        ], [
            'qty.numeric' => 'Quantity must be a number',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            $manuitem = Manuitems::create([
                'item_id' => $request->item_id,
                'qty' => $request->qty,
                'date' => $request->date,
            ]);
// Update the quantity in the Handlist model
            $handlist = Handlist::where('item_id', $request->item_id)->first();
            if ( $handlist) {
                $handlist->qty += $request->qty;
                $handlist->save();
            }

            if ($manuitem) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Manuitem added successfully',
                    'data' => $manuitem
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Something went wrong'
                ], 500);
            }
        }
    }
// Retrieve the manuitem with the specified manu_id
    public function manuitemShow($manuitem_id){
        $manuitems = Manuitems::where('manu_id', $manuitem_id)->first();
        if ($manuitems){
            return response()->json([
               'status' => 200,
                'manuitems' =>  $manuitems
            ], 200);

        } else {
            return response()->json([
               'status' => 404,
               'message' => 'Item not found'
            ], 404);
        }
    }

    public function mannuitemEdit($manuitem_id){
// Retrieve the manuitem with the specified manu_id        
        $manuitems = Manuitems::where('manu_id', $manuitem_id)->first();
        if ($manuitems){
            return response()->json([
               'status' => 200,
               'manuitems' =>   $manuitems
            ], 200);

        } else {
            return response()->json([
               'status' => 404,
               'message' => 'items not found'
            ], 404);
        }
    }

    public function manuitemupdate(Request $request, $manuitem_id)
{
    $validator = Validator::make($request->all(), [
        'item_id' => 'required',
        'qty' => 'required|numeric',
        'date' => 'required|date|before_or_equal:today',
    ], [
        'qty.numeric' => 'Quantity must be a number',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'message' => $validator->messages()
        ], 422);
    } else {
        // Get the old quantity of the manuitem
        $old_manuitem = Manuitems::findOrFail($manuitem_id);
        $old_qty = $old_manuitem->qty;

        // Update the manuitem
        $manuitem = Manuitems::where('manu_id', $manuitem_id)->update([
            'item_id' => $request->item_id,
            'qty' => $request->qty,
            'date' => $request->date,
        ]);

        if ($manuitem) {
            // Calculate the difference in quantity
            $qty_difference = $request->qty - $old_qty;

            // Update the handlist table
            $handlist = Handlist::where('item_id', $request->item_id)->first();
            if ($handlist) {
                $handlist->qty += $qty_difference;
                $handlist->save();
            }

            return response()->json([
                'status' => 200,
                'message' => "Item updated successfully!",
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Something went wrong',
            ], 404);
        }
    }
}
//Function for delete
    public function manuitemdestroy($manuitem_id){
        $manuitems = Manuitems::where('manu_id', $manuitem_id)->first();
        if(  $manuitems){
            $manuitems->delete();
            return response()->json([
               'status' => 200,
               'message' => 'Item deleted successfully'
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
