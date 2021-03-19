<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Visitor extends Model
{
    use HasFactory, Notifiable;
    protected $guarded = [];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d',
        'visit_at' => 'datetime:Y-m-d H:i',
    ];

    public function user(){
        $this->belongsTo(User::class);
    }
}
