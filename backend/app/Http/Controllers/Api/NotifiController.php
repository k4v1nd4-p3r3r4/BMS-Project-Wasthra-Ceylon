<?php

namespace App\Http\Controllers\Api;

use App\Models\Materials;
use App\Models\Foodlist;
use App\Models\Handlist;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class NotifiController extends Controller
{
    public function checkLowQuantityNotifications()
    {
        $lowQuantityMaterials = Materials::where('available_qty', '<', 20)->get();
        $lowQuantityFoods = Foodlist::where('qty', '<', 20)->get();
        $lowQuantityHands = Handlist::where('qty', '<', 20)->get();

        $notifications = [];

        foreach ($lowQuantityMaterials as $material) {
            $notification = [
                'id' => $material->material_id,
                'name' => $material->material_name,
                'message' => 'Quantity is low for material ID ' . $material->material_id . ': ' . $material->material_name,
                'type' => 'material',
                'timestamp' => now(),
            ];

            $notifications[] = $notification;
        }

        foreach ($lowQuantityFoods as $food) {
            $notification = [
                'id' => $food->food_id,
                'name' => $food->food_name,
                'message' => 'Quantity is low for food ID ' . $food->food_id . ': ' . $food->food_name,
                'type' => 'food',
                'timestamp' => now(),
            ];

            $notifications[] = $notification;
        }

        foreach ($lowQuantityHands as $hand) {
            $notification = [
                'id' => $hand->item_id,
                'name' => $hand->item_name,
                'message' => 'Quantity is low for item ID ' . $hand->item_id . ': ' . $hand->item_name,
                'type' => 'hand',
                'timestamp' => now(),
            ];

            $notifications[] = $notification;
        }

        return response()->json([
            'status' => 200,
            'notifications' => $notifications,
        ], 200);
    }
/*
    public function deleteNotification($id, $type)
    {
        if ($type === 'material') {
            $notification = Materials::where('material_id', $id)->delete();
        } elseif ($type === 'food') {
            $notification = Foodlist::where('food_id', $id)->delete();
        } elseif ($type === 'hand') {
            $notification = Handlist::where('item_id', $id)->delete();
        }

        if ($notification) {
            return response()->json([
                'status' => 200,
                'message' => 'Notification deleted successfully',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Notification not found',
            ], 404);
        }
    }*/
}
