<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Migration1732780483946 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

                Schema::create('users', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                Schema::create('affilate', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('affilate', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('kunde', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('kunde', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('projekt', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('projekt', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('projekt_access', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('projekt_access', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::create('rechnungen', function (Blueprint $table) {
                    $table->id();
                    $table->unsignedBigInteger('created_by_user')->nullable();
                    $table->unsignedBigInteger('updated_by_user')->nullable();
                    $table->timestamps();
                });

                    Schema::table('rechnungen', function(Blueprint $table) {
                        $table->foreign('created_by_user')->references('id')->on('users');
                        $table->foreign('updated_by_user')->references('id')->on('users');
                    });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('firstName')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('lastName')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('phoneNumber')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('email')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->enum('role', ['admin','user'])->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->boolean('disabled')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('password')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->boolean('emailVerified')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('emailVerificationToken')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('emailVerificationTokenExpiresAt')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('passwordResetToken')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('passwordResetTokenExpiresAt')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->string('provider')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->integer('idusers')->nullable();

                });

                Schema::table('users', function (Blueprint $table) {
                    $table->timestamp('registratedat')->nullable();

                });

                Schema::table('affilate', function (Blueprint $table) {
                    $table->integer('werbende')->nullable();

                });

                Schema::table('affilate', function (Blueprint $table) {
                    $table->integer('geworbene')->nullable();

                });

                Schema::table('kunde', function (Blueprint $table) {
                    $table->integer('user')->nullable();

                });

                Schema::table('kunde', function (Blueprint $table) {
                    $table->string('name')->nullable();

                });

                Schema::table('kunde', function (Blueprint $table) {
                    $table->string('vorname')->nullable();

                });

                Schema::table('kunde', function (Blueprint $table) {
                    $table->string('strasse')->nullable();

                });

                Schema::table('kunde', function (Blueprint $table) {
                    $table->string('plz')->nullable();

                });

                Schema::table('kunde', function (Blueprint $table) {
                    $table->string('ort')->nullable();

                });

                Schema::table('kunde', function (Blueprint $table) {
                    $table->string('land')->nullable();

                });

                Schema::table('kunde', function (Blueprint $table) {
                    $table->string('partnernr')->nullable();

                });

                Schema::table('kunde', function (Blueprint $table) {
                    $table->string('firma')->nullable();

                });

                Schema::table('rechnungen', function (Blueprint $table) {
                    $table->integer('pv_invoice_id')->nullable();

                });

                Schema::table('rechnungen', function (Blueprint $table) {
                    $table->integer('projekt_id')->nullable();

                });

                Schema::table('projekt_access', function (Blueprint $table) {
                    $table->string('level')->nullable();

                });

                Schema::table('projekt', function (Blueprint $table) {
                    $table->unsignedBigInteger('kunde_id')->nullable();

                    $table->foreign('kunde_id')->references('id')->on('kunde');

                });

                Schema::table('projekt', function (Blueprint $table) {
                    $table->string('name')->nullable();

                });

                Schema::table('projekt', function (Blueprint $table) {
                    $table->integer('status')->nullable();

                });

                Schema::table('projekt', function (Blueprint $table) {
                    $table->string('url')->nullable();

                });

                Schema::table('projekt', function (Blueprint $table) {
                    $table->string('apikey')->nullable();

                });

                Schema::table('projekt', function (Blueprint $table) {
                    $table->string('username')->nullable();

                });

                Schema::table('projekt', function (Blueprint $table) {
                    $table->string('password')->nullable();

                });

    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {

                Schema::table('projekt', function(Blueprint $table) {
                    $table->dropColumn('password');
                });

                Schema::table('projekt', function(Blueprint $table) {
                    $table->dropColumn('username');
                });

                Schema::table('projekt', function(Blueprint $table) {
                    $table->dropColumn('apikey');
                });

                Schema::table('projekt', function(Blueprint $table) {
                    $table->dropColumn('url');
                });

                Schema::table('projekt', function(Blueprint $table) {
                    $table->dropColumn('status');
                });

                Schema::table('projekt', function(Blueprint $table) {
                    $table->dropColumn('name');
                });

                Schema::table('projekt', function(Blueprint $table) {
                    $table->dropColumn('kunde_id');
                });

                Schema::table('projekt_access', function(Blueprint $table) {
                    $table->dropColumn('level');
                });

                Schema::table('projekt_access', function(Blueprint $table) {
                    $table->dropColumn('projekt_id');
                });

                Schema::table('projekt_access', function(Blueprint $table) {
                    $table->dropColumn('users_id');
                });

                Schema::table('rechnungen', function(Blueprint $table) {
                    $table->dropColumn('projekt_id');
                });

                Schema::table('rechnungen', function(Blueprint $table) {
                    $table->dropColumn('pv_invoice_id');
                });

                Schema::table('kunde', function(Blueprint $table) {
                    $table->dropColumn('firma');
                });

                Schema::table('kunde', function(Blueprint $table) {
                    $table->dropColumn('partnernr');
                });

                Schema::table('kunde', function(Blueprint $table) {
                    $table->dropColumn('land');
                });

                Schema::table('kunde', function(Blueprint $table) {
                    $table->dropColumn('ort');
                });

                Schema::table('kunde', function(Blueprint $table) {
                    $table->dropColumn('plz');
                });

                Schema::table('kunde', function(Blueprint $table) {
                    $table->dropColumn('strasse');
                });

                Schema::table('kunde', function(Blueprint $table) {
                    $table->dropColumn('vorname');
                });

                Schema::table('kunde', function(Blueprint $table) {
                    $table->dropColumn('name');
                });

                Schema::table('kunde', function(Blueprint $table) {
                    $table->dropColumn('user');
                });

                Schema::table('affilate', function(Blueprint $table) {
                    $table->dropColumn('geworbene');
                });

                Schema::table('affilate', function(Blueprint $table) {
                    $table->dropColumn('werbende');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('registratedat');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('idusers');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('provider');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('passwordResetTokenExpiresAt');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('passwordResetToken');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerificationTokenExpiresAt');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerificationToken');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('emailVerified');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('password');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('avatar');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('disabled');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('role');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('email');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('phoneNumber');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('lastName');
                });

                Schema::table('users', function(Blueprint $table) {
                    $table->dropColumn('firstName');
                });

                Schema::drop('rechnungen');

                Schema::drop('projekt_access');

                Schema::drop('projekt');

                Schema::drop('kunde');

                Schema::drop('affilate');

                Schema::drop('users');

    }
}
