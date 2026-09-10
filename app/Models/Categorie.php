<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $table = 'categories';

    protected $fillable = ['nom'];

    public function formations()
    {
        return $this->hasMany(Formation::class, 'categorie_id');
    }
}
