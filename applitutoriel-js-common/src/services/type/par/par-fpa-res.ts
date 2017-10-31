import { VilleMetier } from "src/models/ref/ref-ville-mod";
import { PaysMetier } from "src/models/ref/ref-pay-mod";
import { PartenaireMetier } from "src/models/par/par-mod";

/**
 * Données utilisées pour le chargement de la fiche partenaire
 */
export interface FichePartenaireResult {
    villes: Array<VilleMetier>;
    pays: Array<PaysMetier>;
    partenaire?: PartenaireMetier;
}

