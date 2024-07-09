<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usagematerials extends Model
{
    use HasFactory;

    protected $table = 'usage_material';
    protected $primaryKey = 'usage_id';

    protected $fillable = [
        'usage_id',
        'material_id',
        'date',
        'usage_qty'
    ];
}
