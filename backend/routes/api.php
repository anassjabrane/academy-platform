<?php

use App\Http\Controllers\Api\AdminApiController;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\FormationApiController;
use App\Http\Controllers\Api\InscriptionApiController;
use Illuminate\Support\Facades\Route;

// ── Public : accessible a tous, meme sans compte ──
Route::get('/formations', [FormationApiController::class, 'index']);
Route::get('/formations/{id}', [FormationApiController::class, 'show']);
Route::get('/categories', [FormationApiController::class, 'categories']);
Route::post('/register', [AuthApiController::class, 'register']);
Route::post('/login', [AuthApiController::class, 'login']);

// ── Connecte (etudiant OU admin) : juste avoir un token valide ──
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthApiController::class, 'me']);
    Route::put('/me', [AuthApiController::class, 'updateMe']);
    Route::put('/me/password', [AuthApiController::class, 'updatePassword']);
    Route::post('/logout', [AuthApiController::class, 'logout']);
});

// ── Reserve aux etudiants ──
Route::middleware(['auth:sanctum', 'role:etudiant'])->group(function () {
    Route::post('/formations/{id}/inscrire', [InscriptionApiController::class, 'store']);
    Route::get('/mes-formations', [InscriptionApiController::class, 'index']);
    Route::put('/inscriptions/{id}/progression', [InscriptionApiController::class, 'updateProgression']);
    // Route::post('/formations/{id}/avis', [AvisApiController::class, 'store']);
});

// ── Reserve a l'administrateur ──
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/etudiants', [AdminApiController::class, 'etudiants']);
    // Route::post('/formations', [FormationApiController::class, 'store']);
    // Route::put('/formations/{id}', [FormationApiController::class, 'update']);
    // Route::delete('/formations/{id}', [FormationApiController::class, 'destroy']);
});
