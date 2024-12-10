<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projekt_access extends Model {
    protected static $unguarded = true;

    public function users_id(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Users::class, 
        'projekt_access_users_id_users', 'projekt_access_id', 'users_id_id');
    }
    public function projekt_id(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(Projekt::class, 
        'projekt_access_projekt_id_projekt', 'projekt_access_id', 'projekt_id_id');
    }

}

