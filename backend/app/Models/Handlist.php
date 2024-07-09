<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Handlist extends Model
{
    use HasFactory;


    protected $table ='handlist';
    protected $primaryKey = 'item_id';

    protected $fillable = [
       'item_id',
        'item_name',
      
        'unit',
        'qty'
         
         
    ];
    protected $keyType = 'string'; 
}
