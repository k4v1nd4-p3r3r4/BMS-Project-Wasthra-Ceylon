<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class expence extends Model
{
    protected $table = 'expence';
    protected $primaryKey= 'id';
    protected $fillable = [
        'date',
        'description',
        'category',
        'transactor',
        'amount',
        'status',
    ];


    use HasFactory;
}
