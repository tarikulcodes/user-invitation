<?php

use App\Http\Controllers\InvitationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::resource('users', UserController::class);
Route::resource('invitations', InvitationController::class)->only(['index', 'create', 'store', 'destroy']);
