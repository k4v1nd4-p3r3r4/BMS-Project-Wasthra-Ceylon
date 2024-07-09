<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manufood extends Model
{
    use HasFactory;

    protected $table = 'manufood';
    protected $primaryKey = 'manu_id';

    protected $fillable = [
        'manu_id',
        'food_id',
        'qty',
        'date',
        'exp_date',
       
    ];
}
