<?php

namespace App\Http\Controllers\Api;
use App\Models\Itemsale;
use App\Models\Handlist;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use PDF;

class ItemsaleController extends Controller
{
//Function for fetch all details
    public function handsales(){
        $itemsale = Itemsale::orderBy('sale_id', 'desc')->get();
        if ($itemsale->count() > 0) {
            return response()->json([
                'status' => 200,
                'data' => $itemsale
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Items not found'
            ], 404);
        }
    }
 //Function for store data
        public function handsaleStore(Request $request)
        {
            $validator = Validator::make($request->all(), [ // Validate the incoming request data
                'item_id' => 'required',
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

            // Check if the requested item_id exists in the Handlist table
            $handitem = Handlist::where('item_id', $request->item_id)->first();

            // If hand item does not exist or requested quantity exceeds available quantity
            if (!$handitem || $handitem->qty < $request->qty) {
                $validator->errors()->add('qty', 'Sale quantity exceeds available quantity. Check balance.');
                return response()->json([
                    'status' => 422,
                    'message' => $validator->messages(),
                ], 422);
            }

            // Calculate the total amount
            $total_amount = $request->qty * $request->unit_price;

            // Create the sale record
            $itemsale = Itemsale::create([
                'item_id' => $request->item_id,
                'customer_id' => $request->customer_id,
                'date' => $request->date,
                'qty' => $request->qty,
                'unit_price' => $request->unit_price,
                'total_amount' => $total_amount,
            ]);

            if ($itemsale) {
                // Reduce the quantity in Handlist
                $handitem->qty -= $request->qty;
                $handitem->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'Sale added successfully',
                    'sale' => $itemsale
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Failed! Something went wrong!'
                ], 500);
            }
        }

//Function for getting sales details by id
public function handsaleShow($handsale_id){
    $handsale = ItemSale::where('sale_id', $handsale_id)->first();
    if (  $handsale){
        return response()->json([
           'status' => 200,
            'handsale' =>    $handsale
        ], 200);

    } else {
        return response()->json([
           'status' => 404,
           'message' => 'Sale not found'
        ], 404);
    }
}

//Function for editn sales details
public function handsaleedit($handsale_id){
    $handsale = ItemSale::where('sale_id', $handsale_id)->first();
    if ($handsale){
        return response()->json([
           'status' => 200,
           'handsale' =>  $handsale
        ], 200);

    } else {
        return response()->json([
           'status' => 404,
           'message' => 'sale not found'
        ], 404);
    }
}

//Function for updating the sales details
public function handsaleupdate(Request $request, $handsale_id)
{
    $validator = Validator::make($request->all(), [
        'item_id' => 'required',
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
    } else {
        // Retrieve the old sale entry
        $oldHandsale = Itemsale::find($handsale_id);
        if (!$oldHandsale) {
            return response()->json([
                'status' => 404,
                'message' => 'Sale not found'
            ], 404);
        }

        // Calculate the difference in quantity
        $qtyDifference = $request->qty - $oldHandsale->qty;

        // Update the sale entry
        $handsale = Itemsale::where('sale_id', $handsale_id)->update([
            'item_id' => $request->item_id,
            'customer_id' => $request->customer_id,
            'qty' => $request->qty,
            'date' => $request->date,
            'unit_price' => $request->unit_price,
            'total_amount' => $request->qty * $request->unit_price
        ]);

        if ($handsale) {
            // Update the quantity in Handlist
            $handitem = Handlist::where('item_id', $request->item_id)->first();
            if ($handitem) {
                $handitem->qty -= $qtyDifference;
                $handitem->save();
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
}
public function handsaledestroy($handsale_id){

    $handsale = ItemSale::find($handsale_id);

    if($handsale ){

        $handsale ->delete();
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

public function invoiceDetails($sale_id)
    {
        $invoice = Itemsale::where('sale_id', $sale_id)->first();
        if ($invoice) {
            return response()->json([
                'status' => 200,
                'invoice' => $invoice
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Invoice not found'
            ], 404);
        }
    }

    public function downloadInvoice($sale_id)
    {
        $invoice = Itemsale::where('sale_id', $sale_id)->first();
        if ($invoice) {
            $pdf = PDF::loadView('pdf.invoice_template', compact('invoice'));
            return $pdf->download('invoice.pdf');
        } else {
            abort(404, 'Invoice not found');
        }
    }

}
