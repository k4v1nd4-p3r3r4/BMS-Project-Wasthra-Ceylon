<?php

namespace App\Http\Controllers\Api;

use App\Models\Customer;
use App\Models\FoodSale;
use App\Models\ItemSale;
use App\Models\Purchase;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{

//Function for get total count of foodsales
    public function TotalFoodsale()
    {
        $totalFoodSales = FoodSale::count();
        if ($totalFoodSales > 0) {
            return response()->json([
                'status' => 200,
                'total_sales' => $totalFoodSales
            ], 200);
        } else {
            return response()->json([
                'status' => 200, // Change this to 200, as the request was successful even if no sales are found
                'total_sales' => 0, // Provide a default value for total sales
                'message' => 'No sales found'
            ], 200);
        }
    }

//Function for get total item sales count   
    public function TotalItemsale()
    {
        $TotalItemsale = ItemSale::count();
        if ($TotalItemsale > 0) {
            return response()->json([
                'status' => 200,
                'total_sales' => $TotalItemsale
            ], 200);
        } else {
            return response()->json([
                'status' => 200, // Change this to 200, as the request was successful even if no sales are found
                'total_sales' => 0, // Provide a default value for total sales
                'message' => 'No sales found'
            ], 200);
        }
    }

//Function for get sum of both food sales and item sales   
    public function saleTotalAmount()
    {
        {
            // Get the sum of total_amount from foodsale table
            $foodSaleTotal = FoodSale::sum('total_amount');
    
            // Get the sum of total_amount from itemsale table
            $itemSaleTotal = ItemSale::sum('total_amount');
    
            // Calculate the combined total amount
            $totalAmount = $foodSaleTotal + $itemSaleTotal;
    
            return response()->json([
                'status' => 200,
                'total_amount' => $totalAmount
            ]);
        }

    }
    public function purchaseTotalAmount(){
        {
            // Get the sum of total_amount from the purchase table
            $purchaseTotalAmount = Purchase::sum('total_amount');
    
            return response()->json([
                'status' => 200,
                'purchaseTotalAmount' => $purchaseTotalAmount
            ]);
        }
    
    
    }
    public function TotalCustomers()
    {
        $totalCustomers = Customer::count();

        return response()->json([
            'status' => 200,
            'total_customers' => $totalCustomers
        ], 200);
    }
}
