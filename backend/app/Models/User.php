<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    protected $fillable = [
        'name', 'email', 'telephone', 'password', 'role', 'domaine_interet',
        'ville', 'bio', 'linkedin_url', 'github_url',
    ];

    protected $hidden = ['password', 'remember_token'];

    public function formationsCreees()
    {
        return $this->hasMany(Formation::class, 'admin_id');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'etudiant_id');
    }

    public function avis()
    {
        return $this->hasMany(Avis::class, 'etudiant_id');
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}
