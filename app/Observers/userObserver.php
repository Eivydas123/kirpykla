<?php

namespace App\Observers;

use App\Models\User;


class userObserver
{
    /**
     * Handle the User "created" event.
     *
     * @param  \App\Models\User  $user
     * @return void
     */
    public function creating(User $user)
    {
        $user->assignRole('staff');
       
    }
  
}
