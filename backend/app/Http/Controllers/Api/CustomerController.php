<?php

namespace App\Http\Controllers\Api;
use App\Models\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
 //function for get all customers details
    public function customer(){
        $customer = Customer::all();
        if ($customer->count() > 0) {
            return response()->json([
               'status' => 200,
                'data' =>   $customer
            ], 200);

        } else {
            return response()->json([
               'status' => 404,
               'message' => 'customer not found'
            ], 404);
        }
    }

//function for add customer details
    public function customerStore(Request $request){

//validates customer form fields
        $validator = Validator::make($request->all(), [
            'customer_id' => ['required', 'regex:/^C\d{3}$/','unique:customer,customer_id'],
            'first_name' => 'required|regex:/[a-zA-Z]/|max:100',
            'last_name' => 'required|regex:/[a-zA-Z]/|max:100',
            'contact' => 'required|digits:10|numeric',
            'address' => 'required||regex:/[a-zA-Z]/|max:100',
        ], [
            'customer_id.regex' => 'Customer ID should start with C followed by three digits (e.g., C001)',
            'customer_id.unique' => 'Customer ID already exists',
            'first_name.regex' => ' Name must contain at least one letter',
            'last_name.regex' => ' Name must contain at least one letter',
            'contact.numeric' => 'Contact number must be a numeric',
            'address.regex' => 'Address must contain at least one letter'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
        } else {
            $customer = Customer::create([
                'customer_id' => $request->customer_id,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'contact' => $request->contact,
                'address' => $request->address,
            ]);
         
    
            if ($customer) {
                return response()->json([
                    'status' => 200,
                    'message' => 'Customer added successfully',
                    'customer' => $customer
                ], 200);
            } else {
                return response()->json([
                    'status' => 500,
                    'message' => 'Failed! Something went wrong!'
                ], 500);
            }
        }
}

//Get customer data using customer id
public function customerShow($customer_id){
    $customer = Customer::where('customer_id', $customer_id)->first();
    
    if ( $customer){
        return response()->json([
            'status' => 200,
            ' customer' =>   $customer
        ], 200);
    }
    else{
        return response()->json([
            'status' => 404,
            'message' => 'Failed! Record Not found!'
        ], 404);
    }
}

//Function for edit customer details
public function customeredit($customer_id){
    $customer = Customer::where('customer_id', $customer_id)->first();
    
    if ( $customer){
        return response()->json([
            'status' => 200,
            'customer' =>$customer
        ], 200);
    }
    else{
        return response()->json([
            'status' => 404,
            'message' => 'Failed! Record Not found!'
        ], 404);
   }
 }

 //Function for update the customer details
    public function customerupdate(Request $request, $customer_id){

        $validator = Validator::make($request->all(), [
            'customer_id' => ['required', 'regex:/^C\d{3}$/'],
            'first_name' => 'required|regex:/[a-zA-Z]/|max:100',
            'last_name' => 'required|regex:/[a-zA-Z]/|max:100',
            'contact' => 'required|digits:10|numeric',
            'address' => 'required||regex:/[a-zA-Z]/|max:100',
        ], [
            'customer_id.regex' => 'Customer ID should start with C followed by three digits (e.g., C001)',
            'customer_id.unique' => 'Customer ID already exists',
            'first_name.regex' => ' Name must contain at least one letter',
            'last_name.regex' => ' Name must contain at least one letter',
            'contact.numeric' => 'Contact number must be a numeric',
            'address.regex' => 'Address must contain at least one letter'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => $validator->messages()
            ], 422);
}
else {
            
    $customer = Customer::where('customer_id', $customer_id)->first();
 

    if ($customer) {
        $customer->update([
            'customer_id'=> $request->customer_id,
            'first_name'=> $request->first_name,
            'last_name'=> $request->last_name,
            'contact'=> $request->contact,
            'address'=> $request->address
           ]);
        return response()->json([
            'status' => 200,
            'message' => 'Customer updated successfully',
            'customer' => $customer
        ], 200);
    } else {
        return response()->json([
            'status' => 404,
            'message' => 'Failed! Something went wrong!'
        ], 404);
    }
}
}

//Function for delete customer
public function customerdestroy($customer_id){
    
    $customer = Customer::where('customer_id', $customer_id)->first();

    if($customer){

        $customer->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Customer deleted successfully',
            
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