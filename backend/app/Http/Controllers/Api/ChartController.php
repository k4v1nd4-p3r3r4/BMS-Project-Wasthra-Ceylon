<?php

namespace App\Http\Controllers\Api;

use App\Models\Foodlist;
use App\Models\FoodSale;
use App\Models\Handlist;
use App\Models\ItemSale;
use App\Models\Manufood;
use App\Models\Manuitems;
use App\Models\Materials;
use Illuminate\Http\Request;
use App\Models\Usagematerials;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ChartController extends Controller
{
    public function getTotalFoodQtyByDate()
    {
        // Query to get the total quantity of food items grouped by date
        $totalFoodQtyByDate = Manufood::select('date', DB::raw('SUM(qty) as total_qty'))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        // Return the response
        return response()->json([
            'status' => 200,
            'data' => $totalFoodQtyByDate,
        ], 200);
    }

    public function getTotalItemQtyByDate()
    {
        // Query to get the total quantity of items grouped by date
        $totalItemQtyByDate = Manuitems::select('date', DB::raw('SUM(qty) as total_qty'))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        // Return the response
        return response()->json([
            'status' => 200,
            'data' => $totalItemQtyByDate,
        ], 200);
    }
//get material availability according to material name
public function getAvailableQtyByMaterialName()
{
    // Query to get the available quantity of materials grouped by material name
    $availableQtyByMaterialName = Materials::select('material_name', 'available_qty')
        ->orderBy('material_name', 'asc')
        ->get();

    // Return the response
    return response()->json([
        'status' => 200,
        'data' => $availableQtyByMaterialName,
    ], 200);
}


//get available food qty by name
    public function getAvailableQtyByFoodName()
    {
        // Query to get the available quantity of food items grouped by food name
        $availableQtyByFoodName = Foodlist::select('food_name', DB::raw('SUM(qty) as total_qty'))
            ->groupBy('food_name')
            ->orderBy('food_name', 'asc')
            ->get();

        // Return the response
        return response()->json([
            'status' => 200,
            'data' => $availableQtyByFoodName,
        ], 200);
    }
//function for get total qty by item name
    public function getAvailableQtyByItemName()
    {
        // Query to get the available quantity of items grouped by item name
        $availableQtyByItemName = Handlist::select('item_name', DB::raw('SUM(qty) as total_qty'))
            ->groupBy('item_name')
            ->orderBy('item_name', 'asc')
            ->get();

        // Return the response
        return response()->json([
            'status' => 200,
            'data' => $availableQtyByItemName,
        ], 200);
    }




//this function for get material usage qty by material name
public function getUsageQtyByMaterialName()
{
    // Query to get the usage quantity of materials grouped by material name
    $usageQtyByMaterialName = DB::table('usage_material')
        ->select('materials.material_name', DB::raw('SUM(usage_material.usage_qty) as total_usage_qty'))
        ->join('materials', 'usage_material.material_id', '=', 'materials.material_id')
        ->groupBy('materials.material_name')
        ->orderBy('materials.material_name', 'asc')
        ->get();

    // Return the response
    return response()->json([
        'status' => 200,
        'data' => $usageQtyByMaterialName,
    ], 200);
}

//food selling qty by food name
public function getTotalFoodSellingQtyByFoodName()
{
    // Query to get the total selling quantity of food items grouped by food name
    $totalFoodSellingQtyByFoodName = FoodSale::select('foodlist.food_name', DB::raw('SUM(foodsale.qty) as total_qty'))
        ->join('foodlist', 'foodsale.food_id', '=', 'foodlist.food_id')
        ->groupBy('foodlist.food_name')
        ->orderBy('foodlist.food_name', 'asc')
        ->get();

    // Return the response
    return response()->json([
        'status' => 200,
        'data' => $totalFoodSellingQtyByFoodName,
    ], 200);
}

//item selling qty by item name
public function getTotalItemSellingQtyByItemName()
{
    // Query to get the total selling quantity of items grouped by item name
    $totalItemSellingQtyByItemName = ItemSale::select('handlist.item_name', DB::raw('SUM(itemsale.qty) as total_qty'))
        ->join('handlist', 'itemsale.item_id', '=', 'handlist.item_id')
        ->groupBy('handlist.item_name')
        ->orderBy('handlist.item_name', 'asc')
        ->get();

    // Return the response
    return response()->json([
        'status' => 200,
        'data' => $totalItemSellingQtyByItemName,
    ], 200);
}

}
