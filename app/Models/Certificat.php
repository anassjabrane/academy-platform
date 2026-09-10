<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificat extends Model
{
    protected $fillable = ['inscription_id', 'date_obtention', 'url_fichier'];

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }
}
