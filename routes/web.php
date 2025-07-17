<?php

use App\Http\Controllers\InvitationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public invitation registration route
Route::get('/invitation/{tracking_id}/register', [InvitationController::class, 'registerForm'])->middleware('signed')->name('invitation.register');
Route::post('/invitation/{tracking_id}/register', [InvitationController::class, 'register'])->middleware('signed')->name('invitation.register');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'admin'])->group(function () {
    require __DIR__ . '/admin.php';
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
