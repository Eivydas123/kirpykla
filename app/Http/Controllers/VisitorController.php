<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use App\Models\Visitor;
use App\Notifications\VisitApproved;
use App\Notifications\VisitSuccess;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VisitorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct() {
        $this->middleware('signed')->only('destroy');
    }

    public function index(Request $request)
    {
        return Visitor::whereDate('visit_at', ">=", now())->whereNull('user_id')->paginate($request->rows);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //return $request->visit_at;
        $startTime = Carbon::parse($request->visit_at)->addMinutes(-20);
        $endTime = Carbon::parse($request->visit_at)->addMinutes(20);
 
        if(Carbon::parse($request->visit_at)->format('H') < "08" || Carbon::parse($request->visit_at)->format('H') >= "17"){
            return response()->json(['message' => 'This time is already taken'], 422);
        }
        $date = Visitor::whereBetween('visit_at', [$startTime, $endTime])->get();
        
        if($date->count() > 0){
            return response()->json(['message' => 'This time is already taken'], 422);
        }
      
        $data = $request->validate([
            "name" => "required|min:2|max:50",
            "email" => "required|email",
            "visit_at" => "required|date|unique:visitors,visit_at",
        ]);

       
        $user = Visitor::create($data);
        return $user->notify(new VisitSuccess($user));
       
    }
    public function checkDate(Request $request){
        
        $mainDate = Carbon::parse($request->visit_at)->addHours(3);
        $startTime = Carbon::parse($mainDate)->addMinutes(-20);
        
        $endTime = Carbon::parse($mainDate)->addMinutes(20);
       $date = Visitor::whereBetween('visit_at', [$startTime, $endTime])->get();
    //    return [
    //         'main' => $mainDate,
    //         'startTime' => $startTime,
    //         'endTime' => $endTime,
    //         'data' => $date,
    //     ];
       if($date->count() > 0){
           return response()->json(['message' => 'This time is already taken where'], 422);
       }
     
        if($mainDate->format('H') < "08" || $mainDate->format('H') >= "17"){
            return response()->json(['message' => 'This time is already taken from weekday'], 422);
        }
       
    }

    public function getMyCustumers(){
        return Visitor::whereDay('visit_at', now()->day)->whereNotNull('user_id')->get();
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function show(Visitor $visitor)
    {
        return Visitor::selectRaw('DATE(visit_at) as x, COUNT(*) as y')
        ->groupBy('x')
        ->where('visit_at', '>', now()->subWeek())
        ->get();
        

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function update(Visitor $id)
    {
        $id->update([
            'user_id' => Auth::id(),
        ]);

        return $id->notify(new VisitApproved($id, auth()->user()));
      
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Visitor  $visitor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
  
         $delete = Visitor::destroy($request->visitor);
         if($delete){
            return redirect('/?destroy=success');
         }
         return redirect('/?destroy=error');
         
    }
}
