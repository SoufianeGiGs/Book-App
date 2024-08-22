<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('titre_propre');
            $table->string('titre_parallele')->nullable();
            $table->string('titre_auteur_different')->nullable();
            $table->string('complement_titre')->nullable();
            $table->string('annee_edition')->nullable();
            $table->string('ISBN');
            $table->string('nombre_pages')->nullable();
            $table->string('illustration')->nullable();
            $table->string('taille_de_page')->nullable();
            $table->text('note_generale')->nullable();
            $table->text('note_contenu')->nullable();
            $table->text('resume')->nullable();
            $table->string('indexation_decimale')->nullable();
            $table->text('mots_cles')->nullable();
            $table->string('date_de_parution')->nullable();
            $table->string('code_exemplaire')->nullable();
            $table->string('localisation')->nullable();
            $table->string('section')->nullable();
            $table->string('materiel_accompagnement')->nullable();
            $table->string('nom_auteur')->nullable();
            $table->string('editeur')->nullable();
            $table->string('code_editeur')->nullable();
            $table->string('ville_edition')->nullable();
            $table->string('pays_edition')->nullable();
            $table->string('code_langue')->nullable();
            $table->string('collection')->nullable();
            $table->string('sous_collection')->nullable();
            $table->string('numero_collection')->nullable();
            $table->string('mention_edition')->nullable();
            $table->string('lien')->nullable();
            $table->string('numero_serie')->nullable();
            $table->string('tome')->nullable();
            $table->string('volume')->nullable();
            $table->string('cote')->nullable();
            $table->string('fonction_auteur_1')->nullable();
            $table->string('auteur_2')->nullable();
            $table->string('fonction_auteur_2')->nullable();
            $table->string('auteur_3')->nullable();
            $table->string('fonction_auteur_3')->nullable();
            $table->string('auteur_4')->nullable();
            $table->string('fonction_auteur_4')->nullable();
            $table->string('type_auteur')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->boolean('validated')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('books');
    }
}
