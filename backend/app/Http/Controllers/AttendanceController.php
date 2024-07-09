<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Attendance;
use Carbon\Carbon;



class AttendanceController extends Controller
{
    public function index()
    {
        $attendances = Attendance::all();
        return response()->json($attendances);
    }

    public function clockIn(Request $request)
    {
        $attendance = new Attendance();
        $attendance->empid = $request->empid;
        $attendance->clock_in = Carbon::now();
        $attendance->save();

        return response()->json(['message' => 'Clocked in successfully', 'attendance' => $attendance]);
    }

    public function clockOut(Request $request)
    {
        $attendance = Attendance::where('empid', $request->empid)
            ->whereNull('clock_out')
            ->first();

        if ($attendance) {
            $attendance->clock_out = Carbon::now();
            $attendance->save();

            return response()->json(['message' => 'Clocked out successfully', 'attendance' => $attendance]);
        } else {
            return response()->json(['message' => 'No active clock-in found for employee'], 404);
        }
    }
}

