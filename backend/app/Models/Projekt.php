<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projekt extends Model {
    protected static $unguarded = true;

    public function kunde_id(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Kunde::class, 'kunde_id');
    }

}

