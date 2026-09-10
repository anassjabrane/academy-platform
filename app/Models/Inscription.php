<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    protected $fillable = [
        'etudiant_id', 'formation_id', 'date_inscription', 'progression', 'statut',
    ];

    public function etudiant()
    {
        return $this->belongsTo(User::class, 'etudiant_id');
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function certificat()
    {
        return $this->hasOne(Certificat::class);
    }
}
