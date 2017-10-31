/**
 * Constantes liées à l'utilisateur
 */
export const URL_UTILISATEURS: string = "/utilisateurs";
export const URL_UTILISATEURS_AUTH: string = "/auth";

/**
 * Constantes liées au référentiel
 */
export const URL_REF: string = "/referentiel";

export const URL_PAYS: string = "/pays";
export const URL_REF_NATIONALITE: string = "/nationalites";
export const URL_REF_NATIONALITE_PAYS: string = URL_REF_NATIONALITE + URL_PAYS;
export const URL_REF_VILLES: string = "/villes";
export const URL_REF_VILLES_PAYS: string = URL_REF_VILLES + "/pays";

// Constantes liées aux écrans Partenaires

/** Préfixe des actions relatives aux partenaires */
export const URL_PARTENAIRES: string = "/partenaires";

/** Recherche de partenaires répondant à des critères donnés */
export const URL_PAR_RECHERCHE: string = "/recherche";
/** Recherche de partenaires répondant à des critères donnés */
export const URL_PAR_RECHERCHER: string = "/rechercher";
/** Création d'un nouveau partenaire */
export const URL_PAR_CREER: string = "/creer";
/** Consulation d'une fiche partenaire */
export const URL_PAR_CONSULTER: string = "/consulter";
/** Modification d'une fiche partenaire */
export const URL_PAR_EDITER: string = "/editer";
/** Export des partenaire trouvés dans un format donné */
export const URL_PAR_EXPORTER: string = "/export";
/** Export des partenaires trouvés dans un format open file document */
export const URL_PAR_EXPORTER_OFD: string = "/exportopenfiledocument";
/** Sauvegarde du partenaire créé ou modifié */
export const URL_PAR_SAUVEGARDER: string = "/sauvegarder";
/** Suppression d'un partenaire */
export const URL_PAR_SUPPRIMER: string = "/supprimer";
/** Suppression de plusieurs partenaires */
export const URL_PAR_SUPPRESSION_MASSE: string = "/suppression";
/** Consultation de photo rattachée à un partenaire */
export const URL_PAR_PHOTO: string = "/photo";

/**
 * Constantes liées aux écrans Secteurs
 */
export const URL_SECTEURS: string = "/secteurs";
export const URL_SECTEURS_SUPPRIMER: string = "/supprimer";
export const URL_SECTEURS_ADM_LST: string = "/adm_lst";
export const URL_SECTEURS_CREER: string = "/creer";
export const URL_SECTEURS_SAUVEGARDER: string = "/sauvegarder";

/**
 * Constantes Liées aux produits
 */
export const URL_PRODUITS: string = "/produits";
/** Consulation d'une fiche produit */
export const URL_PRO_CONSULTER: string = "/consulter";

/**
 * Constantes Liées aux produits
 */
export const URL_REPARTITIONS: string = "/repartitions";

/**
 * Constantes Liées à la page Contact
 */
export const URL_CONTACT: string = "/contact";

export const URL_CONTACT_ENVOYER: string = "/email";

/** Préfixe generique */
export const URL_RECHERCHE: string = "/recherche";