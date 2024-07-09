<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salaries extends Model
{
    protected $table = 'salaries';
    protected $primaryKey= 'id';
    protected $fillable = [
        'type',
        'status',
        'basic',
        'bonus',
        'leaves',
        'deduction',
    ];
    use HasFactory;
}
