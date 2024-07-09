<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;
    protected $table = 'purchase';
    protected $primaryKey = 'purchase_id';

    protected $fillable = [
        'purchase_id',
        'material_id',
        'supplier_id',
        'qty',
        'date',
        'unit_price',
        'total_amount'
    ];
}
