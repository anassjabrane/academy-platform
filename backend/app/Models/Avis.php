<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    protected $table = 'avis';

    protected $fillable = ['etudiant_id', 'formation_id', 'note', 'commentaire'];

    public function etudiant()
    {
        return $this->belongsTo(User::class, 'etudiant_id');
    }

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
