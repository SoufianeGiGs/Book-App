<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Socialite\SocialiteManager;
use GuzzleHttp\Client as GuzzleClient;

class SocialiteServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(SocialiteManager::class, function ($app) {
            $config = $app['config']['services.google'];
            return new SocialiteManager($app, new GuzzleClient(['verify' => false]));
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
