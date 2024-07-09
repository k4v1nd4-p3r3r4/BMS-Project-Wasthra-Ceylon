<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    protected $table = 'leaves';
    protected $primaryKey = 'id';
    protected $fillable = [
        'empid',
        'date',
        'reason',
        'status',
    ];
    use HasFactory;
}
