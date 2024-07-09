<?php

namespace App\Http\Controllers\Api;
use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class SupplierController extends Controller
{
    public function supplier(){
        
        $supplier = Supplier::all();
        if ($supplier->count() > 0) {
            return response()->json([
                'status' => 200,
                'supplier' => $supplier
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No supllier found'
            ], 404);
        }
    }
    public function supplierStore(Request $request){

        $validator = Validator::make($request->all(), [
            'supplier_id' => ['required', 'regex:/^S\d{3}$/','unique:supplier,supplier_id'],
            'supplier_name' => 'required|regex:/[a-zA-Z]/|max:100',
            'contact_number' => 'required|digits:10|numeric',
            'address' => 'required||regex:/[a-zA-Z]/|max:100',
        ], [
            'supplier_id.regex' => 'Supplier ID should start with S followed by three digits (e.g., S001)',
            'supplier_id.unique' => 'Supplier ID already exists',
            'supplier_name.regex' => 'Supplier name must contain at least one letter',
            'contact_number.numeric' => 'Contact number must be a numeric',
            'address.regex' => 'Address must contain at least one letter'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            $supplier = Supplier::create([
               'supplier_id' => $request->supplier_id,
               'supplier_name' => $request->supplier_name,
                'contact_number' => $request->contact_number,
                'address' => $request->address,
            ]);
         
    
            if ($supplier) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Supplier added successfully',
                    'supplier' => $supplier
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Failed! Something went wrong!'
                ], 500);
            }
        }
}



public function supplierShow($supplier_id){
    $supplier = Supplier::where('supplier_id', $supplier_id)->first();
    
    if ( $supplier){
        return response()->json([
            'status' => 200,
            'supplier' =>  $supplier
        ], 200);
    }
    else{
        return response()->json([
            'status' => 404,
            'message' => 'Failed! Record Not found!'
        ], 404);
    }
}


public function supplieredit($supplier_id){
    $supplier = Supplier::where('supplier_id', $supplier_id)->first();
    
    if ( $supplier){
        return response()->json([
            'status' => 200,
            'supplier' =>$supplier
        ], 200);
    }
    else{
        return response()->json([
            'status' => 404,
            'message' => 'Failed! Record Not found!'
        ], 404);
}

        
    }
    public function supplierupdate(Request $request, $supplier_id){

        $validator = Validator::make($request->all(), [
            'supplier_id' => ['required', 'regex:/^S\d{3}$/'],
            'supplier_name' => 'required|regex:/[a-zA-Z]/|max:100',
            'contact_number' => 'required|digits:10|numeric',
            'address' => 'required||regex:/[a-zA-Z]/|max:100',
        ], [
            'supplier_id.regex' => 'Supplier ID should start with S followed by three digits (e.g., S001)',
            'supplier_name.regex' => 'Supplier name must contain at least one letter',
            'contact_number.numeric' => 'Contact number must be a numeric',
            'address.regex' => 'Address must contain at least one letter'
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            
            $supplier = Supplier::where('supplier_id', $supplier_id)->first();
         
    
            if ($supplier) {
                $supplier ->update([
                    'supplier_id'=> $request->supplier_id,
                    'supplier_name'=> $request->supplier_name,
                    'contact_number'=> $request->contact_number,
                    'address'=> $request->address
                   ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'Supplier updated successfully',
                    'supplier' => $supplier
                ], 200);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Failed! Something went wrong!'
                ], 404);
            }
        }
    }

    public function supplierdestroy($supplier_id){
    
        $supplier = Supplier::where('supplier_id', $supplier_id)->first();

        if($supplier){

            $supplier->delete();
            return response()->json([
                'status' => 200,
                'message' => 'supplier deleted successfully',
                
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