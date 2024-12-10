<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kunde extends Model {
    protected static $unguarded = true;

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Users::class, 'user');
    }

}

