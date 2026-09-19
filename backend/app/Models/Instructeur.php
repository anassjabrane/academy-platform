<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instructeur extends Model
{
    protected $fillable = ['nom', 'email', 'specialite', 'bio', 'photo_url'];

    public function formations()
    {
        return $this->hasMany(Formation::class);
    }
}
