<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Migration1733838073833 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

                Schema::table('kunde', function (Blueprint $table) {
                    $table->unsignedBigInteger('user')->nullable();

                    $table->foreign('user')->references('id')->on('users');

                });

    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {

                Schema::table('kunde', function(Blueprint $table) {
                    $table->dropColumn('user');
                });

                Schema::table('kunde', function (Blueprint $table) {
                    $table->integer('user')->nullable();

                });

    }
}
