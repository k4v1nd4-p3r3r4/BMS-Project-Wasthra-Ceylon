<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foodlist extends Model
{
    use HasFactory;

    protected $table ='foodlist';
    protected $primaryKey = 'food_id';

    protected $fillable = [
       'food_id',
        'food_name',
        'unit',
        'qty'
         
         
    ];
    protected $keyType = 'string'; //it use to difine primary key as a string

}
