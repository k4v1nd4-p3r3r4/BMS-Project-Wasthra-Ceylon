<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class AttendanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('attendances')->insert([
            [
                'empid' => 1,
                'clock_in' => Carbon::now()->subHours(8)->format('Y-m-d H:i:s'),
                'clock_out' => Carbon::now()->subHours(1)->format('Y-m-d H:i:s'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'empid' => 2,
                'clock_in' => Carbon::now()->subHours(6)->format('Y-m-d H:i:s'),
                'clock_out' => Carbon::now()->subMinutes(30)->format('Y-m-d H:i:s'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'empid' => 3,
                'clock_in' => Carbon::now()->subHours(7)->format('Y-m-d H:i:s'),
                'clock_out' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
