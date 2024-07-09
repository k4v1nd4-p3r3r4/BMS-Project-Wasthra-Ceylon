<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FoodSale extends Model
{
    use HasFactory;

    protected $table = 'foodsale';
    protected $primaryKey = 'sale_id';

    protected $fillable = [
        'sale_id',
        'food_id',
        'customer_id',
        'qty',
        'date',
        'unit_price',
        'total_amount'
    ];
}
