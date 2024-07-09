<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $table = 'customer';
    protected $primaryKey = 'customer_id';
    protected $keyType = 'string'; //it use to difine primary key as a string

    protected $fillable = [
       'customer_id',
       'first_name',
       'last_name',
       'contact',
       'address'
    ];
}
