<?php // todo fix tag

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKundeTable extends Migration
{
    public function up()
    {
        Schema::create('kunde', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('created_by_user')->nullable();
            $table->unsignedBigInteger('updated_by_user')->nullable();
            $table->string

("name")->nullable();
            $table->string

("vorname")->nullable();
            $table->string

("strasse")->nullable();
            $table->string

("plz")->nullable();
            $table->string

("ort")->nullable();
            $table->string

("land")->nullable();
            $table->string

("partnernr")->nullable();
            $table->string

("firma")->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('kunde');
    }
}

