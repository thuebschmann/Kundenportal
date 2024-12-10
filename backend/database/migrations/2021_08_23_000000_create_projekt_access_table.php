<?php // todo fix tag

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjektaccessTable extends Migration
{
    public function up()
    {
        Schema::create('projekt_access', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('created_by_user')->nullable();
            $table->unsignedBigInteger('updated_by_user')->nullable();
            $table->string

("level")->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('projekt_access');
    }
}

