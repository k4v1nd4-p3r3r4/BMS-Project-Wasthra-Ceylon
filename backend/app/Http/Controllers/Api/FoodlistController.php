<?php

namespace App\Http\Controllers\Api;
use App\Models\Foodlist;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class FoodlistController extends Controller
{
 
 //Function for get all food items details   
    public function fooditems(){
        $fooditems = Foodlist::all();
        if ($fooditems->count() > 0) {
            return response()->json([
               'status' => 200,
                'data' => $fooditems 
            ], 200);
    
        } else {
            return response()->json([
               'status' => 404,
               'message' => 'Food items not found'
            ], 404);
        }
    }
    

//Function for sotre food items details
    public function foodStore(Request $request)
    {
//validate form fields        
        $validator = Validator::make($request->all(), [
            'food_id' => ['required', 'regex:/^F\d{3}$/', 'unique:foodlist,food_id'],
            'food_name' => 'required|regex:/[a-zA-Z]/|max:100',
          
            'unit'=> 'required',
        ], [
            'food_id.regex' => 'Food ID should start with F followed by three digits (e.g., F001)',
            'food_id.unique' => 'Food ID already exists',
            'food_name.regex' => 'Food name must contain at least one letter',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            $fooditem = Foodlist::create([
                'food_id' => $request->food_id,
                'food_name' => $request->food_name,
             
                'unit' => $request->unit,
                'qty' => 0 // Set to 0 when adding a new entry to foodlist
            ]);

            if ($fooditem) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Food item added successfully',
                    'data' => $fooditem
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Something went wrong'
                ], 500);
            }
        }
    }


 //Function for get data by id   
    public function foodShow($food_id){
        $fooditems = Foodlist::where('food_id', $food_id)->first();
        if ($fooditems){
            return response()->json([
               'status' => 200,
                'fooditems' => $fooditems
            ], 200);

        } else {
            return response()->json([
               'status' => 404,
               'message' => 'Food items not found'
            ], 404);
        }
    }

 //Function for edit data by id   
    public function foodedit($food_id){
        $fooditems = Foodlist::where('food_id', $food_id)->first();
        if ($fooditems){
            return response()->json([
               'status' => 200,
                'fooditems' => $fooditems
            ], 200);

        } else {
            return response()->json([
               'status' => 404,
               'message' => 'Food items not found'
            ], 404);
        }
    
}

//Function for updating data
public function foodupdate(Request $request,$food_id){
    $validator = Validator::make($request->all(), [
        'food_id' => ['required', 'regex:/^F\d{3}$/'],
        'food_name' => 'required|regex:/[a-zA-Z]/|max:100',
      
        'unit'=> 'required',
        
    ], [
        'food_id.regex' => 'Food ID should start with F followed by three digits (e.g., F001)',
        'food_id.unique' => 'Food ID already exists',
        'food_name.regex' => 'Food name must contain at least one letter',
        
    ]);

    if ($validator->fails()) {
        return response()->json([
           'status' => 422,
           'message' => $validator->messages()
        ], 422);
    }
    else{
        $fooditems = Foodlist::where('food_id', $food_id)->update([
            'food_id' => $request->food_id,
            'food_name' => $request->food_name,
           
            'unit' => $request->unit,
           
        ]);
        if($fooditems){
            return response()->json([
               'status' => 200,
               'message' => "Food item updated succesfully!"
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

//Function for delete data
public function fooddestroy($food_id){
    $fooditems = Foodlist::where('food_id', $food_id)->first();
    if($fooditems){
        $fooditems->delete();
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