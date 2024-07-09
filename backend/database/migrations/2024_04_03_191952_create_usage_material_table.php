<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usage_material', function (Blueprint $table) {
            $table->id('usage_id');
            $table->string('material_id');
            $table->foreign('material_id')
                ->references('material_id')
                ->on('materials')
                ->onDelete('cascade');

            $table->date('date');
            $table->double('usage_qty');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usage_material');
    }
};
