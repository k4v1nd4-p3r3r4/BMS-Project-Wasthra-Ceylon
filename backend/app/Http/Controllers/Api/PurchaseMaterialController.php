<?php

namespace App\Http\Controllers\Api;
use App\Models\Purchase;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use PDF;

class PurchaseMaterialController extends Controller
{
    public function downloadInvoice($purchase_id){
    $purchase = Purchase::find($purchase_id);
    
    if (!$purchase) {
        return response()->json([
            'status' => 404,
            'message' => 'No records found'
        ], 404);
    }

    $pdf = PDF::loadView('invoices.invoice', compact('purchase'));
    return $pdf->download('invoice.pdf');
    }

    public function getInvoiceData($purchase_id)
    {
    $purchase = Purchase::find($purchase_id);
    
    if (!$purchase) {
        return response()->json([
            'status' => 404,
            'message' => 'No records found'
        ], 404);
    }

    return response()->json([
        'status' => 200,
        'purchase' => $purchase
    ], 200);
    }


    public function purchase()
    {
        $purchase = Purchase::orderBy('purchase_id', 'desc')->get();
    
        if ($purchase->count() > 0) {
            return response()->json([
                'status' => 200,
                'purchase' =>  $purchase
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No records found'
            ], 404);
        }
    }

    
    
public function purchaseStore(Request $request)
{
    $validator = Validator::make($request->all(), [
        'material_id' => 'required',
        'supplier_id' => 'required',
        'date' => 'required|date|before_or_equal:today',
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

    // Calculate the total amount
    $total_amount = $request->qty * $request->unit_price;

    // Create a new instance of Purchase model
    $purchase = Purchase::create([
        'material_id' => $request->material_id, 
        'supplier_id' => $request->supplier_id,
        'date' => $request->date,
        'qty' => $request->qty,
        'unit_price' => $request->unit_price,
        'total_amount' => $total_amount, // Assign the calculated total amount
    ]);

    if ($purchase) {
        // Update the available_qty in the Materials table
        $materialsController = new MaterialsController();
        $materialsController->updateAvailableQuantity($request->material_id, $request->qty);

        return response()->json([
            'status' => 200,
            'message' => 'Purchase material added successfully',
            'purchase' => $purchase
        ], 200);
    } else {
        return response()->json([
            'status' => 500,
            'message' => 'Failed! Something went wrong!'
        ], 500);
    }
}

public function purchaseShow($purchase_id){
    $purchase = Purchase::find($purchase_id);
    if ( $purchase) {
        return response()->json([
            'status' => 200,
            'purchase' =>  $purchase
        ], 200);
    } else {
        return response()->json([
            'status' => 404,
           'message' => 'No records found'
        ], 404);
    }
}

public function purchaseedit($purchase_id){

    $purchase = Purchase::find($purchase_id);
    if ($purchase) {
        return response()->json([
            'status' => 200,
            'purchase' => $purchase
        ], 200);
    } else {
        return response()->json([
            'status' => 404,
           'message' => 'No records found'
        ], 404);
    }
}

public function purchaseupdate(Request $request, int $purchase_id) {
    $validator = Validator::make($request->all(), [
        'material_id' => 'required',
        'supplier_id' => 'required',
        'date' => 'required|date|before_or_equal:today',
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
        $purchase = Purchase::find($purchase_id);

        if ($purchase) {
            $original_qty = $purchase->qty; // Get the original purchase quantity

            // Update the purchase details
            $total_amount = $request->qty * $request->unit_price;
            $purchase->update([
                'material_id' => $request->material_id,
                'supplier_id' => $request->supplier_id,
                'date' => $request->date,
                'qty' => $request->qty,
                'unit_price' => $request->unit_price,
                'total_amount' => $total_amount,
            ]);

            // Calculate the difference between the original and updated quantities
            $qty_difference = $request->qty - $original_qty;

            // Update the available_qty in the Materials table
            $materialsController = new MaterialsController();
            $materialsController->updateAvailableQuantity($request->material_id, $qty_difference);

            return response()->json([
                'status' => 200,
                'message' => 'Purchase details updated successfully',
                'purchase' => $purchase
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Failed! Something went wrong!'
            ], 404);
        }
    }
}


public function purchasedestroy($purchase_id){

    $purchase = Purchase::find($purchase_id);

    if($purchase){

        $purchase->delete();
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
