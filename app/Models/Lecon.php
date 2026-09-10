<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecon extends Model
{
    protected $table = 'lecons';

    protected $fillable = ['formation_id', 'titre', 'duree', 'ordre'];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
