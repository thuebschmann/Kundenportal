<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToTable extends Migration
{
    public function up()
    {

        Schema::table('users', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('affilate', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('kunde', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('user')->nullable();
            $table->foreign('user')->references('id')->on('users');

        });

        Schema::table('projekt', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

            $table->unsignedBigInteger('kunde_id')->nullable();
            $table->foreign('kunde_id')->references('id')->on('kunde');

        });

        Schema::table('projekt_access', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::create('projekt_access_users_id_users', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('projekt_access_id')->unsigned();
            $table->unsignedBigInteger('users_id_id')->unsigned();
            $table->foreign('projekt_access_id')->references('id')->on('projekt_access');
            $table->foreign('users_id_id')->references('id')->on('users');
        });

        Schema::create('projekt_access_projekt_id_projekt', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('projekt_access_id')->unsigned();
            $table->unsignedBigInteger('projekt_id_id')->unsigned();
            $table->foreign('projekt_access_id')->references('id')->on('projekt_access');
            $table->foreign('projekt_id_id')->references('id')->on('projekt');
        });

        Schema::table('rechnungen', function (Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');

        });

        Schema::table('files', function(Blueprint $table) {
            $table->foreign('created_by_user')->references('id')->on('users');
            $table->foreign('updated_by_user')->references('id')->on('users');
        });
    }

    public function down()
    {
        //
    }
}
