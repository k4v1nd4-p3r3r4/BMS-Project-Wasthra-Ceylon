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
        Schema::create('manuitems', function (Blueprint $table) {
            $table->id('manu_id');
            $table->string('item_id');
            $table->foreign('item_id')
            ->references('item_id')
            ->on('handlist')
            ->onDelete('cascade');

            $table->double('qty');
            $table->date('date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manuitems');
    }
};
