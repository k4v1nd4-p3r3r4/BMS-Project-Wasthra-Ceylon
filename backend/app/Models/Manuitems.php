<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manuitems extends Model
{
    use HasFactory;

    protected $table = 'manuitems';
    protected $primaryKey = 'manu_id';

    protected $fillable = [
        'manu_id',
        'item_id',
        'qty',
        'date',
        
       
    ];
}
