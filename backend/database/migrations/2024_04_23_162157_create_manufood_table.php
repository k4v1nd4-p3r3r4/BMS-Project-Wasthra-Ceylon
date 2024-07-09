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
        Schema::create('manufood', function (Blueprint $table) {
            $table->id('manu_id');

            $table->string('food_id');
            $table->foreign('food_id')
            ->references('food_id')
            ->on('foodlist')
            ->onDelete('cascade');

            $table->double('qty');
            $table->date('date');
            $table->date('exp_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manufood');
    }
};
