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
        Schema::create('purchase', function (Blueprint $table) {
            $table->id('purchase_id');
            $table->string('material_id');
            $table->foreign('material_id')
                ->references('material_id')
                ->on('materials')
                ->onDelete('cascade');

            $table->string('supplier_id');
            $table->foreign('supplier_id')
                ->references('supplier_id')
                ->on('supplier')
                ->onDelete('cascade');

            $table->date('date');
            $table->double('qty');
            $table->double('unit_price');
            $table->double('total_amount');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase');
    }
};
