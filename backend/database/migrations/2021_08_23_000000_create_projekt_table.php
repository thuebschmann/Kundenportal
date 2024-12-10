<?php // todo fix tag

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjektTable extends Migration
{
    public function up()
    {
        Schema::create('projekt', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('created_by_user')->nullable();
            $table->unsignedBigInteger('updated_by_user')->nullable();
            $table->string

("name")->nullable();
            $table->integer

("status")->nullable();
            $table->string

("url")->nullable();
            $table->string

("apikey")->nullable();
            $table->string

("username")->nullable();
            $table->string

("password")->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('projekt');
    }
}

