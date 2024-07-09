<?php

namespace App\Http\Controllers\Api;
use App\Models\FoodSale;
use App\Models\Foodlist;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use PDF;

class FoodsaleController extends Controller
{
 //Function for get all food sales details
    public function foodsale(){
        $foodsale = FoodSale::orderBy('sale_id', 'desc')->get();
        if ($foodsale->count() > 0) {
            return response()->json([
                'status' => 200,
                'data' => $foodsale
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Sale not found'
            ], 404);
        }
    }

//Function for store foodsales details
public function foodsaleStore(Request $request)
{
    $validator = Validator::make($request->all(), [
        'food_id' => 'required',
        'customer_id' => 'required',
        'date' => 'required',
        'qty' => 'required|numeric',
        'unit_price' => 'required|numeric'
    ], [
        'qty.numeric' => 'Quantity must be a number',
        'unit_price.numeric' => 'Unit price must be a number',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'message' => $validator->messages()
        ], 422);
    }

    // Check if the requested food_id exists in the Foodlist table
    $food = Foodlist::where('food_id', $request->food_id)->first();
    if (!$food) {
        return response()->json([
            'status' => 404,
            'message' => 'Food not found'
        ], 404);
    }

    // Check if the requested sale quantity exceeds the available quantity in Foodlist
    if ($request->qty > $food->qty) {
        $validator->errors()->add('qty', 'Sale quantity exceeds available quantity. Check balance.');
        return response()->json([
            'status' => 422,
            'message' => $validator->messages()
        ], 422);
    }

    // Calculate the total amount
    $total_amount = $request->qty * $request->unit_price;

    $foodsale = FoodSale::create([
        'food_id' => $request->food_id,
        'customer_id' => $request->customer_id,
        'date' => $request->date,
        'qty' => $request->qty,
        'unit_price' => $request->unit_price,
        'total_amount' => $total_amount, // Assign the calculated total amount
    ]);

    if ($foodsale) {
        // Deduct the quantity from the Foodlist table
        $food->qty -= $request->qty;
        $food->save();

        return response()->json([
            'status' => 200,
            'message' => 'Sale added successfully',
            'sale' => $foodsale
        ], 200);
    } else {
        return response()->json([
            'status' => 500,
            'message' => 'Failed! Something went wrong!'
        ], 500);
    }
}

//Get food details by id
public function foodsaleShow($foodsale_id){
    $foodsale = FoodSale::where('sale_id', $foodsale_id)->first();
    if ( $foodsale){
        return response()->json([
           'status' => 200,
            'foodsale' =>   $foodsale
        ], 200);

    } else {
        return response()->json([
           'status' => 404,
           'message' => 'Sale not found'
        ], 404);
    }
}

//Function for edit food sale details
public function foodsaleedit($foodsale_id){
    $foodsale = FoodSale::where('sale_id', $foodsale_id)->first();
    if ($foodsale){
        return response()->json([
           'status' => 200,
           'foodsale' =>   $foodsale
        ], 200);

    } else {
        return response()->json([
           'status' => 404,
           'message' => 'sale not found'
        ], 404);
    }
}

// Method to fetch invoice details
public function foodsaleInvoice($sale_id)
{
    $foodsale = FoodSale::where('sale_id', $sale_id)->first();
    if ($foodsale) {
        return response()->json([
            'status' => 200,
            'foodsale' => $foodsale
        ], 200);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'Sale not found'
        ], 404);
    }
}

// Method to download invoice as PDF
public function foodsaleInvoiceDownload($sale_id)
{
    $foodsale = FoodSale::where('sale_id', $sale_id)->first();
    if ($foodsale) {
        $pdf = PDF::loadView('pdf.invoice', compact('foodsale'));
        return $pdf->download('invoice.pdf');
    } else {
        abort(404, 'Invoice not found');
    }
}


//Function for updating food sales details
public function foodsaleupdate(Request $request, $foodsale_id)
{
//validate form fields
    $validator = Validator::make($request->all(), [
        'food_id' => 'required',
        'customer_id' => 'required',
        'date' => 'required',
        'qty' => 'required|numeric',
        'unit_price' => 'required|numeric'
    ], [
        'qty.numeric' => 'Quantity must be a number',
        'unit_price.numeric' => 'Unit price must be a number',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => 422,
            'message' => $validator->messages()
        ], 422);
    }

    // Retrieve the old sale entry
    $oldFoodsale = FoodSale::find($foodsale_id);
    if (!$oldFoodsale) {
        return response()->json([
            'status' => 404,
            'message' => 'Sale not found'
        ], 404);
    }

    // Calculate the difference in quantity
    $qtyDifference = $request->qty - $oldFoodsale->qty;

    // Update the sale entry
    $foodsale = FoodSale::where('sale_id', $foodsale_id)->update([
        'food_id' => $request->food_id,
        'customer_id' => $request->customer_id,
        'qty' => $request->qty,
        'date' => $request->date,
        'unit_price' => $request->unit_price,
        'total_amount' => $request->qty * $request->unit_price
    ]);

    if ($foodsale) {
        // Update the quantity in Foodlist
        $fooditem = Foodlist::where('food_id', $request->food_id)->first();
        if ($fooditem) {
            $fooditem->qty -= $qtyDifference;
            $fooditem->save();
        }

        return response()->json([
            'status' => 200,
            'message' => "Sale updated successfully!"
        ], 200);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'Something went wrong'
        ], 404);
    }
}

//Delete the food item
public function foodsaledestroy($foodsale_id){

    $foodsale = FoodSale::find($foodsale_id);

    if($foodsale){

        $foodsale->delete();
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
