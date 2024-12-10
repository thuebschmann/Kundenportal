<?php

use Illuminate\Support\Facades\Route;


Route::get('/', fn() => view('welcome'));

Route::get('/api-docs', function () {
    return view('swagger.index');
});
