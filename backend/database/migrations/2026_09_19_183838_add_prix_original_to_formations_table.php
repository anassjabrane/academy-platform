<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('formations', function (Blueprint $table) {
            $table->decimal('prix_original', 8, 2)->nullable()->after('prix');
        });
    }

    public function down(): void
    {
        Schema::table('formations', function (Blueprint $table) {
            $table->dropColumn('prix_original');
        });
    }
};
