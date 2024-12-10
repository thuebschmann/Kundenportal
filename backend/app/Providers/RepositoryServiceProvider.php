<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Eloquent\BaseRepository;
use App\Repositories\EloquentRepositoryInterface;

use App\Repositories\UsersRepositoryInterface;
use App\Repositories\Eloquent\UsersRepository;
use App\Repositories\AffilateRepositoryInterface;
use App\Repositories\Eloquent\AffilateRepository;
use App\Repositories\KundeRepositoryInterface;
use App\Repositories\Eloquent\KundeRepository;
use App\Repositories\ProjektRepositoryInterface;
use App\Repositories\Eloquent\ProjektRepository;
use App\Repositories\Projekt_accessRepositoryInterface;
use App\Repositories\Eloquent\Projekt_accessRepository;
use App\Repositories\RechnungenRepositoryInterface;
use App\Repositories\Eloquent\RechnungenRepository;
use App\Repositories\FilesRepositoryInterface;
use App\Repositories\Eloquent\FilesRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(EloquentRepositoryInterface::class, BaseRepository::class);

        $this->app->bind(UsersRepositoryInterface::class, UsersRepository::class);

        $this->app->bind(AffilateRepositoryInterface::class, AffilateRepository::class);

        $this->app->bind(KundeRepositoryInterface::class, KundeRepository::class);

        $this->app->bind(ProjektRepositoryInterface::class, ProjektRepository::class);

        $this->app->bind(Projekt_accessRepositoryInterface::class, Projekt_accessRepository::class);

        $this->app->bind(RechnungenRepositoryInterface::class, RechnungenRepository::class);
        $this->app->bind(FilesRepositoryInterface::class, FilesRepository::class);
    }
}

