<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    protected $fillable = [
        'categorie_id', 'admin_id', 'instructeur',
        'titre', 'description', 'prix', 'niveau', 'duree',
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'categorie_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    public function lecons()
    {
        return $this->hasMany(Lecon::class)->orderBy('ordre');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }

    public function noteMoyenne()
    {
        return $this->avis()->avg('note');
    }
}
