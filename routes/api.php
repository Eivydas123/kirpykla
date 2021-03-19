<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\VisitorController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return [
        'user' => auth()->user(),
        'roles' => auth()->user()->getRoleNames(),
    ];
});

Route::post("/visit", [VisitorController::class, 'store']);
Route::get("/cancel", [VisitorController::class, 'destroy'])->name('cancel');
Route::post("/visit/checkDate", [VisitorController::class, 'checkDate']);

Route::get("/token/{token:token}", [TokenController::class, 'show']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::group(['middleware' => ['role:admin']], function () {
        
        Route::post("/token", [TokenController::class, 'store']);
        Route::post("/showChart", [VisitorController::class, 'show']);
        Route::post("/users", [UserController::class, 'index']);
        Route::delete("/users/{id}", [UserController::class, 'destroy']);
    });

    Route::get("/profile", [UserController::class, 'show']);
   
    Route::get("/getMyCustumers", [VisitorController::class, 'getMyCustumers']);
   
    Route::post("/visitPaginate", [VisitorController::class, 'index']);
    Route::put("/visit/{id}", [VisitorController::class, 'update']);

});


