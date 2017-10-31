import { Pays } from "src/models/ref/ref-pay-mod";
import { Ville } from "src/models/ref/ref-ville-mod";

/**
 * Résultat de recherche de partenaires
 */
export interface TablePartenaire {
    /** Critères de recherche. */
    listeCriteres: FormRecherchePartenaire;
}

/**
 * Données de formulaire recherche de partenaire
 */
export interface FormRecherchePartenaire {

    /** The partenaire. */
    partenaire: PartenaireResult;

    /** The uti id. */
    utiId?: string;

    /** The id secteur. */
    idSecteur?: number;

    /** The start date. */
    startDate: number;

    /** The end date. */
    endDate?: number;
}

/**
 * Données d'un partenaire
 */
export interface PartenaireResult {
    assistCourriel?: string;
    assistNom?: string;
    assistPrenom?: string;
    assistTel?: string;
    civilite?: CiviliteResult;
    commentaire?: string;
    dateCrea?: number;
    dateModif?: number | Date;
    fonction?: string;
    id?: number;
    isClient?: boolean;
    isVIP?: boolean;
    isVIPFiltre?: boolean;
    labelIsVIP?: string;
    nationalite?: Pays;
    nom?: string;
    nomLocal?: string;
    organisme?: string;
    photo?: any;
    prenom?: string;
    prenomLocal?: string;
    proAdrCP?: string;
    proAdrRue?: string;
    proCourriel?: string;
    proFax?: string;
    proTelFixe?: string;
    proTelPort?: string;
    satisfaction?: string | string[];
    ville?: Ville;
    proAutresTels?: String[];
}

/**
 * Civilité d'un partenaire
 */
export interface CiviliteResult {
    id: number;
    libelle: string;
}
