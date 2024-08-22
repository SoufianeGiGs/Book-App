<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
       'titre_propre', 'ISBN', 'titre_parallele', 'titre_auteur_different', 
        'complement_titre', 'annee_edition', 'nombre_pages', 'illustration', 
        'taille_de_page', 'note_generale', 'note_contenu', 'resume', 
        'indexation_decimale', 'mots_cles', 'date_de_parution', 'code_exemplaire', 
        'localisation', 'section', 'materiel_accompagnement', 'nom_auteur', 
        'editeur', 'code_editeur', 'ville_edition', 'pays_edition', 'code_langue', 
        'collection', 'sous_collection', 'numero_collection', 'mention_edition', 
        'lien', 'numero_serie', 'tome', 'volume', 'cote', 'fonction_auteur_1', 
        'auteur_2', 'fonction_auteur_2', 'auteur_3', 'fonction_auteur_3', 
        'auteur_4', 'fonction_auteur_4', 'type_auteur', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
