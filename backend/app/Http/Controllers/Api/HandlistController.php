<?php

namespace App\Http\Controllers\Api;
use App\Models\Handlist;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class HandlistController extends Controller
{
    

 // Fetch all items from the Handlist model
    public function handitems(){
        $handitems = Handlist::all();
        if ($handitems->count() > 0) {// Check if there are any items in the collection
            return response()->json([
               'status' => 200,
                'data' =>  $handitems
            ], 200);

        } else {
            return response()->json([
               'status' => 404,
               'message' => 'Food items not found'
            ], 404);
        }
    }

//Function for store hand items data
    public function handStore(Request $request)
    {
  // Validate the incoming request data        
        $validator = Validator::make($request->all(), [
            'item_id' => ['required', 'regex:/^H\d{3}$/', 'unique:handlist,item_id'],
            'item_name' => 'required|regex:/[a-zA-Z]/|max:100',
           
            'unit'=>'required',
        ], [
            'item_id.regex' => 'Food ID should start with H followed by three digits (e.g., H001)',
            'item_id.unique' => 'Food ID already exists',
            'item_name.regex' => 'Food name must contain at least one letter',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            $handitem = Handlist::create([
                'item_id' => $request->item_id,
                'item_name' => $request->item_name,

                'unit'=>$request->unit,
                'qty' => 0 // Set to 0 when adding a new entry to handlist
            ]);

            if ($handitem) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Hand item added successfully',
                    'data' => $handitem
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Something went wrong'
                ], 500);
            }
        }
    }

 //Function for fetch data according id   
    public function handShow($hand_id){
        $handitems = Handlist::where('item_id', $hand_id)->first();
        if ($handitems){
            return response()->json([
               'status' => 200,
                'handitems' => $handitems
            ], 200);

        } else {
            return response()->json([
               'status' => 404,
               'message' => 'Hand items not found'
            ], 404);
        }
    }
// Function for edit hand item details
    public function handedit($hand_id){
         $handitems = Handlist::where('item_id', $hand_id)->first();
        if ($handitems){
            return response()->json([
               'status' => 200,
                'handitems' =>  $handitems
            ], 200);

        } else {
            return response()->json([
               'status' => 404,
               'message' => 'Hand items not found'
            ], 404);
        }
    
}

//Update a handlist item
public function handupdate(Request $request,$item_id){
// Validate the incoming request data   
    $validator = Validator::make($request->all(), [
        'item_id' => ['required', 'regex:/^H\d{3}$/'],
        'item_name' => 'required|regex:/[a-zA-Z]/|max:100',
        'unit'=>'required'
    ], [
        'item_id.regex' => 'Food ID should start with H followed by three digits (e.g., H001)',
        'item_id.unique' => 'Food ID already exists',
        'item_name.regex' => 'Food name must contain at least one letter',
        
    ]);

    if ($validator->fails()) {
        return response()->json([
           'status' => 422,
           'message' => $validator->messages()
        ], 422);
    }
    else{
        $handitems = Handlist::where('item_id', $item_id)->update([
            'item_id' => $request->item_id,
            'item_name' => $request->item_name,
           
            'unit'=>$request->unit,
            
        ]);
        if($handitems){
            return response()->json([
               'status' => 200,
               'message' => 'Hand item updated successfully',
               
            ], 200);
        }
        else{
            return response()->json([
               'status' => 500,
               'message' => 'Something went wrong'
            ], 500);
        }
    }
    }

//Function for deleting items    
    public function handdestroy($hand_id){
        $handitems = Handlist::where('item_id', $hand_id)->first();
        if($handitems){
            $handitems->delete();
            return response()->json([
               'status' => 200,
               'message' => 'Hand item deleted successfully'
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
