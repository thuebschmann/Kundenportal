<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\AffilateController;
use App\Http\Controllers\Api\KundeController;
use App\Http\Controllers\Api\ProjektController;
use App\Http\Controllers\Api\Projekt_accessController;
use App\Http\Controllers\Api\RechnungenController;
use App\Http\Controllers\Api\FilesController;

Route::get('analytics', fn() => Storage::disk('local')->get('analytics.json'))->middleware('auth:api');

Route::post('file/upload/{table}/{column}', [FilesController::class, 'uploadFile']);
Route::get('file/download', [FilesController::class, 'download']);

Route::get('/email/verify/{id}/{hash}', [UsersController::class, 'verifyEmail'])
    ->middleware(['signed'])->name('verification.verify');

Route::group([
    'middleware' => 'auth:api',
], function() {

    Route::get('users/autocomplete', [UsersController::class, 'findAllAutocomplete']);
    Route::get('users/count', [UsersController::class, 'count']);
    Route::resource('users', UsersController::class);

    Route::get('affilate/autocomplete', [AffilateController::class, 'findAllAutocomplete']);
    Route::get('affilate/count', [AffilateController::class, 'count']);
    Route::resource('affilate', AffilateController::class);

    Route::get('kunde/autocomplete', [KundeController::class, 'findAllAutocomplete']);
    Route::get('kunde/count', [KundeController::class, 'count']);
    Route::resource('kunde', KundeController::class);

    Route::get('projekt/autocomplete', [ProjektController::class, 'findAllAutocomplete']);
    Route::get('projekt/count', [ProjektController::class, 'count']);
    Route::resource('projekt', ProjektController::class);

    Route::get('projekt_access/autocomplete', [Projekt_accessController::class, 'findAllAutocomplete']);
    Route::get('projekt_access/count', [Projekt_accessController::class, 'count']);
    Route::resource('projekt_access', Projekt_accessController::class);

    Route::get('rechnungen/autocomplete', [RechnungenController::class, 'findAllAutocomplete']);
    Route::get('rechnungen/count', [RechnungenController::class, 'count']);
    Route::resource('rechnungen', RechnungenController::class);

});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth',
], function () {
    Route::any('signin/local', [AuthController::class, 'login'])->name('login');
    Route::put('verify-email', [UsersController::class, 'sendVerifyEmail']);
    Route::get('me', [AuthController::class, 'me']);
    Route::get('signin/google', [UsersController::class, 'signinGoogle']);
    Route::get('google/callback', [UsersController::class, 'callbackGoogle']);
    Route::post('signup', [AuthController::class, 'signup']);
    Route::put('password-update', [AuthController::class, 'passwordUpdate']);
    Route::post('send-password-reset-email', [AuthController::class, 'sendPasswordResetEmail']);
});
