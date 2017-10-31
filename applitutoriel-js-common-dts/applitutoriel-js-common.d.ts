declare module "applitutoriel-js-common/src/i18n/app-i18n-loader" {
	import { I18nLoader } from "hornet-js-core/src/i18n/i18n-loader";
	export class AppliI18nLoader extends I18nLoader {
	    constructor();
	}
	
}

declare module "applitutoriel-js-common/src/middleware/authentication" {
	import { Application } from "express";
	import { AbstractHornetMiddleware } from "hornet-js-core/src/middleware/middlewares";
	import { AuthService }  from "applitutoriel-js-common/src/services/data/auth/auth-service";
	export class AuthenticationMiddleware extends AbstractHornetMiddleware {
	    private static logger;
	    protected api: AuthService;
	    insertMiddleware(app: Application): void;
	}
	
}

declare module "applitutoriel-js-common/src/mock/routes" {
	export class BouchonRoutes {
	    static build(router: any): void;
	}
	
}

declare module "applitutoriel-js-common/src/models/photo-mod" {
	export class PhotoMetier {
	    id: number;
	    fileName: string;
	    mimeType: string;
	    encoding: string;
	    size: number;
	    data: Buffer;
	}
	
}

declare module "applitutoriel-js-common/src/models/user-mod" {
	export class RoleMetier {
	    id: number;
	    name: string;
	}
	export class UtilisateurMetier {
	    id: number;
	    login: string;
	    password: string;
	    enabled: boolean;
	    roles: Array<RoleMetier>;
	}
	
}

declare module "applitutoriel-js-common/src/services/applitutoriel-agent" {
	import { HornetSuperAgent } from "hornet-js-core/src/services/hornet-superagent";
	import { UserInformations } from "hornet-js-utils/src/authentication-utils";
	/**
	 * Exemple de surcharge de la classe HornetAgent fournie par le framework afin d'ajouter les roles de l'utilisateur
	 */
	export class ApplitutorielAgent extends HornetSuperAgent {
	    private currentUser;
	    constructor(user?: UserInformations);
	}
	
}

declare module "applitutoriel-js-common/src/services/applitutoriel-secteurs-service-impl" {
	import { ServiceRequest } from "hornet-js-core/src/services/service-request";
	/**
	 * Exemple de surcharge de la classe ServiceApi fournie par le framework
	 * afin de changer l'adresse du serveur tomcat pour gerer le multi service
	 */
	export abstract class ApplitutorielSecteursServiceImpl extends ServiceRequest {
	    /**
	     * Le service par défaut est configuré dans default.json (partie services)
	     * Mais il est possible d'en configurer d'autres (configuration "multi-services")
	     * Exemple :
	     * Si le service des secteurs est déployé sur un autre serveur que celui par défaut
	     * alors on redéfinit les variables serviceHost et serviceName pour mettre l'adresse
	     * du service spécifique des secteurs (secteursServices.host dans default.json)
	     */
	    constructor();
	}
	
}

declare module "applitutoriel-js-common/src/utils/roles" {
	/**
	 * Classe regroupant les rôles disponibles dans l'appli-tuto
	 */
	export class Roles {
	    static USER_STR: string;
	    static ADMIN_STR: string;
	    static USER: string[];
	    static ADMIN: string[];
	    static EVERYONE: string[];
	}
	
}

declare module "applitutoriel-js-common/src/utils/urls" {
	/**
	 * Constantes liées à l'utilisateur
	 */
	export const URL_UTILISATEURS: string;
	export const URL_UTILISATEURS_AUTH: string;
	/**
	 * Constantes liées au référentiel
	 */
	export const URL_REF: string;
	export const URL_PAYS: string;
	export const URL_REF_NATIONALITE: string;
	export const URL_REF_NATIONALITE_PAYS: string;
	export const URL_REF_VILLES: string;
	export const URL_REF_VILLES_PAYS: string;
	/** Préfixe des actions relatives aux partenaires */
	export const URL_PARTENAIRES: string;
	/** Recherche de partenaires répondant à des critères donnés */
	export const URL_PAR_RECHERCHE: string;
	/** Recherche de partenaires répondant à des critères donnés */
	export const URL_PAR_RECHERCHER: string;
	/** Création d'un nouveau partenaire */
	export const URL_PAR_CREER: string;
	/** Consulation d'une fiche partenaire */
	export const URL_PAR_CONSULTER: string;
	/** Modification d'une fiche partenaire */
	export const URL_PAR_EDITER: string;
	/** Export des partenaire trouvés dans un format donné */
	export const URL_PAR_EXPORTER: string;
	/** Export des partenaires trouvés dans un format open file document */
	export const URL_PAR_EXPORTER_OFD: string;
	/** Sauvegarde du partenaire créé ou modifié */
	export const URL_PAR_SAUVEGARDER: string;
	/** Suppression d'un partenaire */
	export const URL_PAR_SUPPRIMER: string;
	/** Suppression de plusieurs partenaires */
	export const URL_PAR_SUPPRESSION_MASSE: string;
	/** Consultation de photo rattachée à un partenaire */
	export const URL_PAR_PHOTO: string;
	/**
	 * Constantes liées aux écrans Secteurs
	 */
	export const URL_SECTEURS: string;
	export const URL_SECTEURS_SUPPRIMER: string;
	export const URL_SECTEURS_ADM_LST: string;
	export const URL_SECTEURS_CREER: string;
	export const URL_SECTEURS_SAUVEGARDER: string;
	/**
	 * Constantes Liées aux produits
	 */
	export const URL_PRODUITS: string;
	/** Consulation d'une fiche produit */
	export const URL_PRO_CONSULTER: string;
	/**
	 * Constantes Liées aux produits
	 */
	export const URL_REPARTITIONS: string;
	/**
	 * Constantes Liées à la page Contact
	 */
	export const URL_CONTACT: string;
	export const URL_CONTACT_ENVOYER: string;
	/** Préfixe generique */
	export const URL_RECHERCHE: string;
	
}

declare module "applitutoriel-js-common/src/views/counter-events" {
	import { HornetEvent } from "hornet-js-core/src/event/hornet-event";
	export interface CountChangeEventDetail {
	    count: number;
	}
	export let COUNT_CHANGE_EVENT: HornetEvent<CountChangeEventDetail>;
	
}

declare module "applitutoriel-js-common/src/actions/adm/adm-lst-actions" {
	import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
	import { AdministrationSecteurService }  from "applitutoriel-js-common/src/services/data/adm/adm-secteur-service";
	export class ListerSecteurs extends RouteActionService<any, AdministrationSecteurService> {
	    execute(): Promise<any>;
	}
	export class SupprimerSecteur extends RouteActionService<{
	    id: number;
	}, AdministrationSecteurService> {
	    execute(): Promise<any>;
	}
	export class ModifierSecteur extends RouteActionService<{
	    id: number;
	}, AdministrationSecteurService> {
	    execute(): Promise<any>;
	}
	export class CreerSecteur extends RouteActionService<any, AdministrationSecteurService> {
	    execute(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/actions/adm/adm-rps-actions" {
	import { FicheProduitService }  from "applitutoriel-js-common/src/services/page/adm/adm-fpo-service-page";
	import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
	export class ListerProduits extends RouteActionService<any, FicheProduitService> {
	    execute(): Promise<any>;
	}
	export class Repartition extends RouteActionService<any, FicheProduitService> {
	    execute(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/actions/cnt/gen-cnt-actions" {
	import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
	import { ContactService }  from "applitutoriel-js-common/src/services/page/cnt/contact-service-page";
	/**
	 * Appel le service distant pour réaliser l"envoi de la demande de contact.
	 */
	export class Send extends RouteActionService<any, ContactService> {
	    execute(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/actions/par/par-fpa-actions" {
	import { RouteAction } from "hornet-js-core/src/routes/abstract-routes";
	import { DataValidator } from "hornet-js-core/src/validation/data-validator";
	import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
	import { ResultFile } from "hornet-js-core/src/result/result-file";
	import { FichePartenaireService } from "applitutoriel-js-common/src/services/data/par/fiche-partenaire-service";
	import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
	/**
	 * Charge les données nécessaires à l'écran de fiche partenaire
	 */
	export class FichePartenaire extends RouteActionService<{
	    id: number;
	}, PartenaireService> {
	    execute(): Promise<any>;
	}
	export class LirePhoto extends RouteActionService<{
	    idPartenaire: number;
	}, FichePartenaireService> {
	    execute(): Promise<ResultFile>;
	}
	export class Valider extends RouteAction<any> {
	    execute(): Promise<any>;
	}
	/**
	 * Action de création ou de modification de partenaire
	 */
	export class EcrirePartenaire extends RouteActionService<any, FichePartenaireService> {
	    /**
	     * Renvoie l'objet contenant les éléments nécessaires à la validation des données du partenaire.
	     * @override
	     */
	    getDataValidator(): DataValidator;
	    /**
	     * @override
	     */
	    getPayload(): any;
	    execute(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/actions/par/par-rpa-actions" {
	import { PartenaireService }  from "applitutoriel-js-common/src/services/data/par/partenaire-service";
	import { DataValidator } from "hornet-js-core/src/validation/data-validator";
	import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
	import { ResultFile } from "hornet-js-core/src/result/result-file";
	import { ResultStream } from "hornet-js-core/src/result/result-stream";
	/**
	 * Action de recherche de partenaires répondant aux critères indiqués
	 */
	export class Rechercher extends RouteActionService<any, PartenaireService> {
	    /**
	     * Renvoie l'objet contenant les éléments nécessaires à la validation des critères de recherche.
	     * @override
	     */
	    getDataValidator(): DataValidator;
	    execute(): Promise<any>;
	}
	/**
	 * Suppression d'un partenaire ayant l'identifiant indiqué
	 */
	export class SupprimerPartenaire extends RouteActionService<{
	    id: string;
	}, PartenaireService> {
	    execute(): Promise<any>;
	}
	/**
	 * Suppression plusieurs partenaires en une seule action
	 */
	export class SupprimerEnMasse extends RouteActionService<{
	    id: string;
	}, PartenaireService> {
	    execute(): Promise<any>;
	}
	export class Export extends RouteActionService<{
	    mediaType: string;
	}, PartenaireService> {
	    execute(): Promise<ResultStream | ResultFile>;
	}
	export class ExportLite extends RouteActionService<any, PartenaireService> {
	    execute(): Promise<ResultFile>;
	}
	
}

declare module "applitutoriel-js-common/src/actions/pro/pro-actions" {
	import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
	import { ProduitService }  from "applitutoriel-js-common/src/services/data/pro/produit-service";
	export class ListerProduits extends RouteActionService<any, ProduitService> {
	    execute(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/actions/ref/ref-actions" {
	import { ReferentielPaysService }  from "applitutoriel-js-common/src/services/page/ref/ref-pays-service";
	import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
	export class ListerPays extends RouteActionService<any, ReferentielPaysService> {
	    execute(): Promise<any>;
	}
	export class ListerVilles extends RouteActionService<any, ReferentielPaysService> {
	    execute(): Promise<any>;
	}
	export class ListerNationalites extends RouteActionService<any, ReferentielPaysService> {
	    execute(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/bo/par/par-rpa-bo" {
	import { UploadedFile } from "hornet-js-core/src/data/file";
	export class Partenaire {
	    id: number;
	    civilite: {
	        id: string;
	    };
	    pays: {
	        id: string;
	    };
	    ville: {
	        id: string;
	    };
	    nationalite: {
	        id: string;
	    };
	    isClient: boolean;
	    isVIP: boolean;
	    photo: UploadedFile;
	}
	
}

declare module "applitutoriel-js-common/src/models/adm/sec-mod" {
	export class SecteurMetier {
	    id: number;
	    nom: string;
	    desc: string;
	    dateCreat: Date;
	    auteurCreat: string;
	    dateMajEnreg: Date;
	    auteurMaj: string;
	    dateSupEnreg: Date;
	    auteurSupEnreg: string;
	    constructor(nom: string, description: string);
	}
	
}

declare module "applitutoriel-js-common/src/models/par/par-mod" {
	import { PaysMetier }  from "applitutoriel-js-common/src/models/ref/ref-pay-mod";
	import { VilleMetier }  from "applitutoriel-js-common/src/models/ref/ref-ville-mod";
	import { CiviliteMetier }  from "applitutoriel-js-common/src/models/ref/ref-civilite-mod";
	import { PhotoMetier }  from "applitutoriel-js-common/src/models/photo-mod";
	import { ProduitMetier }  from "applitutoriel-js-common/src/models/pro/pro-mod";
	export class Satisfaction {
	    ids: string[];
	}
	export class PartenaireMetier {
	    id: number;
	    ville: VilleMetier;
	    civilite: CiviliteMetier;
	    nationalite: PaysMetier;
	    photo: PhotoMetier;
	    listeProduit: Array<ProduitMetier>;
	    isClient: boolean;
	    isVIP: boolean;
	    nom: string;
	    prenom: string;
	    nomLocal: string;
	    prenomLocal: string;
	    dateNaissance: Date;
	    organisme: string;
	    fonction: string;
	    proTelFixe: string;
	    proTelPort: string;
	    proCourriel: string;
	    proFax: string;
	    proAdrRue: string;
	    proAdrCP: string;
	    assistNom: string;
	    assistPrenom: string;
	    assistTel: string;
	    assistCourriel: string;
	    commentaire: string;
	    satisfaction: Satisfaction | string;
	    dateCreat: Date;
	    dateModif: Date;
	    proAutresTels: String[];
	}
	
}

declare module "applitutoriel-js-common/src/models/par/pro-par-mod" {
	import { PartenaireMetier }  from "applitutoriel-js-common/src/models/par/par-mod";
	export class ProduitPartenaireMetier {
	    produit: number;
	    partenaire: PartenaireMetier;
	}
	
}

declare module "applitutoriel-js-common/src/models/pro/pro-mod" {
	import { SecteurMetier }  from "applitutoriel-js-common/src/models/adm/sec-mod";
	export class ProduitMetier {
	    id: number;
	    nom: string;
	    desc: string;
	    secteur: SecteurMetier;
	}
	
}

declare module "applitutoriel-js-common/src/models/ref/ref-civilite-mod" {
	export class CiviliteMetier {
	    id: number;
	    libelle: string;
	}
	
}

declare module "applitutoriel-js-common/src/models/ref/ref-pay-mod" {
	export type Pays = {
	    /** Identifiant du pays */
	    id: number;
	    /** Libellé du pays */
	    libelle: string;
	    /** Libellé de la nationalité */
	    nationalite: string;
	};
	export class PaysMetier {
	    id: number;
	    libelle: string;
	    nationalite: string;
	}
	
}

declare module "applitutoriel-js-common/src/models/ref/ref-ville-mod" {
	import { Pays, PaysMetier }  from "applitutoriel-js-common/src/models/ref/ref-pay-mod";
	export type Ville = {
	    id: number;
	    libelle: string;
	    pays: Pays;
	};
	export class VilleMetier {
	    id: number;
	    libelle: string;
	    pays: PaysMetier;
	}
	
}

declare module "applitutoriel-js-common/src/views/adm/adm-lst-page" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { SecteurMetier }  from "applitutoriel-js-common/src/models/adm/sec-mod";
	import { AdministrationSecteurService }  from "applitutoriel-js-common/src/services/page/adm/adm-secteur-service";
	/**
	 * Page d'administration des secteurs. L'ajout ou l'édition d'un secteur se fait dans une fenêtre modale.
	 */
	export class SecteursPage extends HornetPage<AdministrationSecteurService, HornetComponentProps, any> {
	    /** Tableau de liste de secteurs */
	    private dataSource;
	    /** Modale d'édition de secteur */
	    private maModale;
	    /** Formulaire d'édition de secteur */
	    private monForm;
	    protected headerTable: any;
	    protected item: SecteurMetier;
	    constructor(props?: any, context?: any);
	    /**
	     * Alimente le tableau de liste des secteurs.
	     * @override
	     */
	    prepareClient(): void;
	    /**
	     * Met à jour le tableau de liste des secteurs
	     */
	    private refreshSecteurs();
	    refHeaderTable(element: any): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	    /**
	     * Méthode permettant de connaître les colonnes affichées/masquées
	     * @param columns
	     */
	    private onChangeToggleColumns(columns);
	    /**
	     * Fonction de submit du formulaire
	     * @param item: l'item du tableau qu a été edité
	     */
	    private submitLineForm(item);
	    /**
	     * Déclenche la suppression du secteur ayant l'identifiant indiqué
	     * @param item
	     */
	    private supprimer(item);
	    /**
	     * Ouvre la fenêtre modale d'édition de secteur
	     * @param item élément du tableau de secteurs
	     */
	    private editItem(item);
	    /**
	     * Ouvre la fenêtre modale de création de secteur
	     */
	    private ajouterSecteur();
	    /**
	     * exemple de tri multicolonnes
	     */
	    private sortMulti();
	    /**
	     * Ferme la modale de création/édition de secteur sans appliquer les changements.
	     */
	    private closeModal();
	    /**
	     * Fonction déclenchée lors de l'envoi du formulaire d'édition de secteur
	     * @param data données du formulaire
	     */
	    private onSubmitEdition(data);
	}
	
}

declare module "applitutoriel-js-common/src/views/adm/adm-rps-page" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { FicheProduitService }  from "applitutoriel-js-common/src/services/page/adm/adm-fpo-service-page";
	export class RepartitionPage extends HornetPage<FicheProduitService, HornetComponentProps, any> {
	    private chart;
	    private element;
	    private data;
	    private color;
	    static defaultProps: any;
	    constructor(props?: any, context?: any);
	    prepareClient(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	    componentDidUpdate(): void;
	}
	
}

declare module "applitutoriel-js-common/src/views/cnt/gen-cnt-page" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { ContactService }  from "applitutoriel-js-common/src/services/page/cnt/contact-service-page";
	export class ContactPage extends HornetPage<ContactService, HornetComponentProps, any> {
	    private formI18n;
	    constructor(props?: HornetComponentProps, context?: any);
	    /**
	     * Alimente le tableau de liste des secteurs.
	     * @override
	     */
	    prepareClient(): void;
	    /**
	     * Déclenche le submit du formulaire de contact
	     * @param data
	     */
	    onSubmit(data: any): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/gen/gen-acb-page" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	export class AccessibilitePage extends HornetPage<any, HornetComponentProps, any> {
	    constructor(props: HornetComponentProps, context?: any);
	    prepareClient(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/gen/gen-acs-cmp" {
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { HornetComponent } from "hornet-js-react-components/src/widget/component/hornet-component";
	export interface AccessibleComponentProps extends HornetComponentProps {
	    linkHelpVisible: boolean;
	    linkContactVisible: boolean;
	    applicationTitle: string;
	    linkFullscreenVisible: boolean;
	    onClickLinkFullscreen: any;
	    changeInternationalization: Function;
	}
	export class AccessibleComponent extends HornetComponent<AccessibleComponentProps, any> {
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/gen/gen-aid-page" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	export class AidePage extends HornetPage<any, HornetComponentProps, any> {
	    prepareClient(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/gen/gen-cnx-page" {
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { HornetComponent } from "hornet-js-react-components/src/widget/component/hornet-component";
	export interface ConnexionPageProps extends HornetComponentProps {
	    errorMessage?: any;
	    previousUrl?: string;
	    staticUrl?: string;
	}
	/**
	 * Ecran de connexion
	 */
	export class ConnexionPage extends HornetComponent<ConnexionPageProps, any> {
	    constructor(props: any);
	    componentDidMount(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	    _renderErrorDiv(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/gen/gen-ddc-page" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	export class DeclarationconformitePage extends HornetPage<any, HornetComponentProps, any> {
	    prepareClient(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/gen/gen-hom-page" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	/**
	 * Ecran de page d'accueil de l'application
	 */
	export class HomePage extends HornetPage<any, HornetComponentProps, any> {
	    prepareClient(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/gen/gen-nfe-page" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	export class NotFoundPage extends HornetPage<any, HornetComponentProps, any> {
	    constructor(props?: HornetComponentProps, context?: any);
	    prepareClient(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/nav/nav-pap-page" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	/**
	 * Ecran du plan de l'application
	 */
	export class PlanAppliPage extends HornetPage<any, HornetComponentProps, any> {
	    prepareClient(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/layouts/hornet-app" {
	import { Class } from "hornet-js-utils/src/typescript-utils";
	import { HornetPage, HornetPageProps } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { Menu } from "hornet-js-react-components/src/widget/navigation/menu";
	export interface HornetAppProps extends HornetPageProps, HornetComponentProps {
	    componentContext: any;
	    context: any;
	    relativeLogoUrl: string;
	    content: Class<HornetPage<any, any, any>>;
	    headerTitleUrl: string;
	}
	export class HornetApp extends HornetPage<any, HornetAppProps, any> {
	    menu: Menu;
	    constructor(props: HornetAppProps, context?: any);
	    static defaultProps: {
	        composantPage: any;
	        workingZoneWidth: string;
	    };
	    componentDidMount(): void;
	    componentWillUpdate(nextProps: any, nextState: any): void;
	    prepareClient(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	    /**
	     * Méthode permettant de passer en mode plein écran
	     */
	    onClickLinkFullscreen(): void;
	    /**
	     * Méthode permettant de changer de langue
	     * @param i18nLocale
	     */
	    private handleChangeLanguage(i18nLocale);
	    /**
	     *
	     * @param value valeur sélectionnée dans la liste des users mocké
	     */
	    private changeUserTo(value);
	}
	
}

declare module "applitutoriel-js-common/src/views/layouts/hornet-layout" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	export interface HornetLayoutProps extends HornetComponentProps {
	    content: string;
	    state: any;
	    appLogo: string;
	    appTheme: string;
	    fwkTheme: string;
	    appStatic: string;
	    applicationLoading: string;
	    nojavascript: boolean;
	    applicationTitle: string;
	}
	/**
	 * Layout de l'application
	 */
	export class HornetLayout extends HornetPage<any, HornetLayoutProps, any> {
	    static defaultProps: {
	        appLogo: string;
	        appTheme: string;
	        fwkTheme: string;
	        appStatic: string;
	        appStaticDll: string;
	        nojavascript: boolean;
	        applicationTitle: string;
	    };
	    constructor(props: HornetLayoutProps, context?: any);
	    prepareClient(): void;
	    private getLoadingText();
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	    private renderScript();
	    private renderScriptVendor();
	}
	
}

declare module "applitutoriel-js-common/src/views/par/par-rpa-page" {
	import { HornetPage, HornetPageProps } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { RecherchePartenaireService }  from "applitutoriel-js-common/src/services/page/par/par-rpa-service";
	/**
	 * Page de recherche des partenaires. L'ajout ou la modification d'un partenaire se fait dans une fiche indépendante
	 */
	export class RecherchePartenairesPage extends HornetPage<RecherchePartenaireService, HornetPageProps, any> {
	    private paginateDataSource;
	    private dataSourceIsClient;
	    private isTableVisible;
	    /** Tableau de liste de partenaires */
	    private maTable;
	    /** Composant Liste déroulante des secteurs */
	    private secteurSelect;
	    /** Composant CheckBox isVip */
	    private checkBoxIsVip;
	    /** Liste permettant d'alimenter la liste déroulante des secteurs */
	    private listeSecteurs;
	    private dataSourceSecteurs;
	    /** Formulaire de recherche */
	    private formRecherche;
	    private criteresRecherche;
	    private endDate;
	    /** Valeurs par défaut du formulaire de recherche */
	    private defaultValues;
	    /** Liste des types de client */
	    private LISTE_IS_CLIENT;
	    /** Objet des critères initiaux (provenant du CLS ou de la session dans le cas d'un F5) */
	    private currentCriteres;
	    constructor(props?: HornetPageProps, context?: any);
	    /**
	     * Alimente le tableau de liste des partenaires
	     * @override
	     */
	    prepareClient(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	    /**
	     * Méthode permettant d'initialiser le dataSource
	     * @param props
	     */
	    private initDataSource(props);
	    /**
	     * Evènement exécuté après suppression d'un partenaire
	     */
	    private refresh();
	    /**
	     * @return true lorsque l'utilisateur courant a le rôle d'administrateur
	     */
	    private isAdmin();
	    /**
	     * Surcharge le style CSS de certaines lignes
	     * @param partenaire élément correspondant à une ligne de tableau
	     * @returns la/les classes CSS à appliquer à la ligne correspondant à item
	     */
	    private static customRowsClasses(partenaire);
	    /**
	     * Génère le formulaire de sélection de critères de recherche
	     */
	    private renderFormCriteres();
	    /**
	     *
	     * @param formData
	     */
	    private onSubmit(formData);
	    /**
	     * Réinitialise le formulaire de recherche avec le valeurs par défaut, vide et réinitialise le tableau, supprime
	     * les entrées du CLS.
	     * @param e
	     */
	    private onReinitialiser(e);
	    /**
	     * Fonction déclenchée lors du clic sur l'un des boutons d'export
	     * @param mediaType type MIME abrégé de l'export souhaité (par exemple "xls")
	     */
	    private onExport(mediaType, value);
	    /**
	     * Méthode de suppression d'un partenaire
	     * @param partenaire élément correspondant à une ligne du tableau de partenaires
	     */
	    private supprimer(partenaire);
	    /**
	     * Méthode de suppression de plusieurs partenaires
	     * @param partenaires éléments correspondant à des ligne du tableau de partenaires
	     */
	    private supprimerEnMasse(value, partenaires);
	    /**
	     * appel a la page d'édition d'un partenaire
	     * on lui passe si le partenaire est vip ou non en donnée
	     * @param partenaire
	     */
	    private editerPartenaire(partenaire);
	    /**
	     * appel a la page de consultation d'un partenaire
	     * on lui passe si le partenaire est vip ou non en donnée
	     * @param partenaire
	     */
	    private consulterPartenaire(partenaire);
	    /**
	     * @param time {Number} temps UTC en ms depuis "Epoch"
	     * @returns {string} la date formatée suivant le format défini pour les calendriers
	     */
	    private getDateFormatee(time);
	    private changeLabelEndDate(event);
	}
	
}

declare module "applitutoriel-js-common/src/views/par/par-rpa-validate-end-date" {
	import { IValidationResult, ICustomValidation } from "hornet-js-core/src/validation/data-validator";
	/**
	 * Exemple de validation personnalisée pour les critères de recherche de partenaires
	 */
	export class ParRpaValidateIsVipEndDate implements ICustomValidation {
	    /**
	     * Vérifie que la date de fin est renseignée lorsque le critère VIP est coché.
	     * @param data données de formulaire
	     * @returns {{valid: boolean, errors: Array<ErrorObject>}}
	     */
	    validate(data: any): IValidationResult;
	}
	
}

declare module "applitutoriel-js-common/src/views/par/par-rpa-validate-start-date" {
	import { IValidationResult, ICustomValidation } from "hornet-js-core/src/validation/data-validator";
	/**
	 * Exemple de validation personnalisée pour les critères de recherche de partenaires
	 */
	export class ParRpaValidateSectorStartDate implements ICustomValidation {
	    /**
	     * Vérifie que la date de début est inférieure au 01/01/2001 lorsque lorsqu'un secteur est sélectionné
	     * @param data données de formulaire
	     * @returns {{valid: boolean, errors: Array<ErrorObject>}}
	     */
	    validate(data: any): IValidationResult;
	}
	
}

declare module "applitutoriel-js-common/src/views/pro/pro-lst-page" {
	import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { AdministrationSecteurService }  from "applitutoriel-js-common/src/services/page/adm/adm-secteur-service";
	export class ListeProduitsPage extends HornetPage<AdministrationSecteurService, HornetComponentProps, any> {
	    private dataSource;
	    constructor(props?: HornetComponentProps, context?: any);
	    prepareClient(): void;
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/services/data/adm/adm-secteur-service" {
	import { ApplitutorielSecteursServiceImpl } from "applitutoriel-js-common/src/services/applitutoriel-secteurs-service-impl";
	/**
	 * Interface des services pour les secteurs
	 * @interface
	 */
	export abstract class AdministrationSecteurService extends ApplitutorielSecteursServiceImpl {
	    abstract lister(): Promise<any>;
	    abstract supprimer(id: number): Promise<any>;
	    abstract creer(secteur: any): Promise<any>;
	    abstract modifier(id: number, secteur: any): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/data/auth/auth-service" {
	import { ServiceSecure } from "hornet-js-core/src/services/service-secure";
	/**
	 * Interface des services pour l'authentification
	 * @interface
	 */
	export abstract class AuthService extends ServiceSecure {
	    abstract auth(data: any): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/data/par/fiche-partenaire-service" {
	import { ServiceSecure } from "hornet-js-core/src/services/service-secure";
	import { PartenaireMetier } from "applitutoriel-js-common/src/models/par/par-mod";
	import { Response } from "superagent";
	/**
	 * Implémentation des services pour les partenaires
	 * @class
	 * @implements {FichePartenaireService, IService}
	 */
	export abstract class FichePartenaireService extends ServiceSecure {
	    /**
	     * Récupère les données liés au partenaires
	     * @param id du partenaire
	     * @return Promise<object>
	     */
	    abstract fichePartenaire(id: number): Promise<any>;
	    /**
	     * Récupère les données nécessaires pour l'affichage du partenaire
	     * @return Promise<object>
	     */
	    abstract getFormData(): Promise<any>;
	    /**
	     * Récupère les données nécessaires pour l'affichage du partenaire
	     * @return Promise<object>
	     * @ignore
	     */
	    abstract charger(id: any): Promise<any>;
	    /**
	     * Récupère les données des nationalités en fonction des caractères saisis
	     * @return Promise<object>
	     */
	    abstract rechercherNationalites(nationalite: string): Promise<any>;
	    /**
	     * Modifie ou crée un partenaire en base
	     * @return Promise<object>
	     */
	    abstract modifier(id: any, partenaire: any): Promise<any>;
	    /**
	     * Récupère la photo du partenaire
	     * @return Promise<object>
	     */
	    abstract lirePhoto(idPartenaire: any): Promise<any>;
	    /**
	     * Insère la photo du partenaire s'il celle-ci existe.
	     * @return Promise<object>
	     */
	    abstract insertPhoto(partenaire: PartenaireMetier): Promise<any>;
	    saveToken(response: Response): void;
	    getToken(): String;
	}
	
}

declare module "applitutoriel-js-common/src/services/data/par/partenaire-service" {
	import { MediaType } from "hornet-js-core/src/protocol/media-type";
	import { PartenaireRechercheParameter } from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
	import { PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";
	import { ServiceSecure } from "hornet-js-core/src/services/service-secure";
	import { Response } from "superagent";
	export abstract class PartenaireService extends ServiceSecure {
	    /**
	     * liste les produits
	     * @return Promise
	     */
	    abstract rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any>;
	    abstract supprimer(id: any): Promise<any>;
	    abstract supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any>;
	    abstract exporter(reqMimeType: MediaType): Promise<any>;
	    abstract exporterODF(reqMimeType: MediaType): Promise<any>;
	    /**
	     * Creation / Modifiaction d'un partenaire existant
	     * @param {number} id identifiant du partenaire à modifier
	     * @param {object} partenaire partenaire à modifier
	     * @return Promise<object>
	     */
	    abstract modifier(id: number, partenaire: any): Promise<any>;
	    abstract fichePartenaire(id: number): Promise<any>;
	    abstract getFormData(): Promise<any>;
	    saveToken(response: Response): void;
	    getToken(): String;
	}
	
}

declare module "applitutoriel-js-common/src/services/data/pro/produit-service" {
	export interface ProduitService {
	    /**
	     * liste les produits
	     * @return Promise
	     */
	    lister(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/data/ref/ref-pays-service" {
	import { ServiceRequest } from "hornet-js-core/src/services/service-request";
	/**
	 * Implementation des services pour les referentiels
	 * @class
	 * @implements {ReferentielPaysService}
	 */
	export abstract class ReferentielPaysService extends ServiceRequest {
	    /**
	     * liste les pays
	     * Utilisé :
	     * - hornet
	     * @returns {Promise<object>}
	     */
	    abstract listerPays(): Promise<any>;
	    /**
	     * liste les nationnalités
	     * Utilisé :
	     * - hornet
	     * - hornet-lite
	     * @param {string} nationalite
	     * @returns {Promise<object>}
	     */
	    abstract rechercherNationalites(nationalite?: string): Promise<any>;
	    /**
	     * liste les villes
	     * Utilisé :
	     * - hornet
	     * @returns {Promise<object>}
	     */
	    abstract listerVilles(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/page/adm/adm-fpo-service-page" {
	/**
	 * Interface des services pour les produits
	 * @interface
	 */
	export abstract class FicheProduitService {
	    /**
	     * liste les produits
	     * @return Promise
	     */
	    abstract listerProduits(): Promise<any>;
	    /**
	     * donne la répartition des produits par secteur
	     * @return Promise
	     */
	    abstract repartition(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/page/adm/adm-secteur-service" {
	import { ApplitutorielSecteursServiceImpl } from "applitutoriel-js-common/src/services/applitutoriel-secteurs-service-impl";
	/**
	 * Interface des services pour les secteurs
	 * @interface
	 */
	export abstract class AdministrationSecteurService extends ApplitutorielSecteursServiceImpl {
	    abstract lister(): Promise<any>;
	    abstract supprimer(id: number): Promise<any>;
	    abstract creer(secteur: any): Promise<any>;
	    abstract modifier(id: number, secteur: any): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/page/auth/auth-service" {
	import { ServiceRequest } from "hornet-js-core/src/services/service-request";
	/**
	 * Interface des services pour l'authentification
	 * @interface
	 */
	export abstract class AuthService extends ServiceRequest {
	    abstract auth(data: any): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/page/cnt/contact-service-page" {
	/**
	 * Interface des services pour les contacts
	 * @interface
	 */
	export interface ContactService {
	    envoyer(data: any): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/page/par/par-fpa-service" {
	import { ServiceRequest } from "hornet-js-core/src/services/service-request";
	/**
	 * Interface des services pour les partenaires
	 * @interface
	 */
	export abstract class FichePartenairePageService extends ServiceRequest {
	    abstract fichePartenaire(id: number): Promise<any>;
	    abstract getFormData(): Promise<any>;
	    abstract modifier(id: number, partenaire: any, progress: Function): Promise<any>;
	    abstract lirePhoto(idPhoto: any): Promise<any>;
	    abstract rechercherNationalites(nationalite: string): Promise<any>;
	    abstract listerSecteurs(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/page/par/par-rpa-service" {
	import { PartenaireRechercheParameter }  from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
	import { MediaType } from "hornet-js-core/src/protocol/media-type";
	import { PartenaireResult }  from "applitutoriel-js-common/src/services/type/par/par-types";
	import { ServiceRequest } from "hornet-js-core/src/services/service-request";
	/**
	 * Interface des services pour les partenaires
	 * @interface
	 */
	export abstract class RecherchePartenaireService extends ServiceRequest {
	    abstract rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any>;
	    abstract supprimer(id: any): Promise<any>;
	    abstract supprimerPage(id: any): Promise<any>;
	    abstract supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any>;
	    abstract exporter(reqMimeType: MediaType, criteres?: PartenaireRechercheParameter): Promise<any>;
	    abstract exporterODF(reqMimeType: MediaType, criteres?: PartenaireRechercheParameter): Promise<any>;
	    abstract listerSecteurs(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/page/ref/ref-pays-service" {
	/**
	 * Interface des services pour les referentiels
	 * @interface
	 */
	export abstract class ReferentielPaysService {
	    abstract listerPays(): Promise<any>;
	    abstract rechercherNationalites(nationalite: string): Promise<any>;
	    abstract listerVilles(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/services/type/par/fpa-par-type" {
	export interface FichePartenaire {
	    id?: number;
	    ville?: number;
	    civilite?: number;
	    pays?: number;
	    nationalite?: number;
	    photo?: number;
	    isClient?: boolean;
	    isVIP?: boolean;
	    nom?: string;
	    prenom?: string;
	    nomLocal?: string;
	    prenomLocal?: string;
	    dateNaissance?: string;
	    organisme?: string;
	    fonction?: string;
	    proTelFixe?: string;
	    proTelPort?: string;
	    proCourriel?: string;
	    proFax?: string;
	    proAdrRue?: string;
	    proAdrCP?: string;
	    assistNom?: string;
	    assistPrenom?: string;
	    assistTel?: string;
	    assistCourriel?: string;
	    commentaire?: string;
	    satisfaction?: string | string[];
	    dateCreat?: string;
	    dateModif?: string;
	}
	
}

declare module "applitutoriel-js-common/src/services/type/par/par-fpa-res" {
	import { VilleMetier }  from "applitutoriel-js-common/src/models/ref/ref-ville-mod";
	import { PaysMetier }  from "applitutoriel-js-common/src/models/ref/ref-pay-mod";
	import { PartenaireMetier }  from "applitutoriel-js-common/src/models/par/par-mod";
	/**
	 * Données utilisées pour le chargement de la fiche partenaire
	 */
	export interface FichePartenaireResult {
	    villes: Array<VilleMetier>;
	    pays: Array<PaysMetier>;
	    partenaire?: PartenaireMetier;
	}
	
}

declare module "applitutoriel-js-common/src/services/type/par/par-rpa-prm" {
	import { Pagination } from "hornet-js-core/src/component/datasource/paginate-datasource";
	import { FormRecherchePartenaire }  from "applitutoriel-js-common/src/services/type/par/par-types";
	import { SortData } from "hornet-js-core/src/component/sort-data";
	/**
	 * Données à fournir au service de recherche de partenaires
	 */
	export interface PartenaireRechercheParameter {
	    /** Paramètres de pagination */
	    pagination?: Pagination;
	    /** Critères de recherche */
	    criteres: FormRecherchePartenaire;
	    /** Paramètres de tri */
	    sort?: SortData;
	}
	
}

declare module "applitutoriel-js-common/src/services/type/par/par-types" {
	import { Pays }  from "applitutoriel-js-common/src/models/ref/ref-pay-mod";
	import { Ville }  from "applitutoriel-js-common/src/models/ref/ref-ville-mod";
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
	
}

declare module "applitutoriel-js-common/src/views/par/par-fpa/fiche-partenaire-page" {
	import { HornetPage, HornetPageProps } from "hornet-js-react-components/src/widget/component/hornet-page";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { FichePartenairePageService }  from "applitutoriel-js-common/src/services/page/par/par-fpa-service";
	export const PAR_MODE_CONSULTER: string;
	export const PAR_MODE_EDITER: string;
	export const PAR_MODE_CREER: string;
	/**
	 * Ecran de détail de partenaire en lecture ou en édition
	 */
	export class FichePartenairePage extends HornetPage<FichePartenairePageService, HornetPageProps, any> {
	    private fichePartenaireTitre;
	    private tabs;
	    private identiteTab;
	    private dataSourceNationalite;
	    private dataSourceProduits;
	    private dataSourceSecteurs;
	    private countNewTab;
	    constructor(props?: HornetComponentProps, context?: any);
	    updateClient(): void;
	    /** @inheritDoc */
	    prepareClient(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	    /**
	     * Sélection des tabs
	     */
	    onSelect(Tab: any, flag: any): void;
	    /**
	     * Ajouter des onglets dynamiquement
	     */
	    addTab(): void;
	    removeTab(): void;
	    /**
	     * Supprimer les onglets créés dynamiquement
	     */
	    delTabs(): void;
	    /**
	     * Méthode de chargement de l'onglet asynchrone
	     * @param tab
	     * @param header
	     * @param index
	     */
	    loadAsyncTab(tab: any, header: any, index: any): void;
	    /**
	     * Méthode de Navigation exécutée lors de la soumission du formulaire du Tab1
	     * @param partenaireData
	     */
	    private onSubmit(partenaireData);
	    /**
	     * méthode de Navigation exécutée lors du clic sur le bouton Annuler Tab1
	     */
	    private onCancel();
	}
	
}

declare module "applitutoriel-js-common/src/views/par/par-fpa/fiche-partenaire-titre-page" {
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { HornetComponent } from "hornet-js-react-components/src/widget/component/hornet-component";
	export interface FichePartenaireTitrePageProps extends HornetComponentProps {
	    title: string;
	}
	export class FichePartenaireTitrePage extends HornetComponent<FichePartenaireTitrePageProps, any> {
	    constructor(props?: FichePartenaireTitrePageProps, context?: any);
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/par/par-fpa/identite-tab" {
	import * as React from "react";
	import { TabContentProps } from "hornet-js-react-components/src/widget/tab/tab-content";
	import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
	import { PaysMetier }  from "applitutoriel-js-common/src/models/ref/ref-pay-mod";
	import { VilleMetier }  from "applitutoriel-js-common/src/models/ref/ref-ville-mod";
	import { PartenaireMetier }  from "applitutoriel-js-common/src/models/par/par-mod";
	import { TabContent } from "hornet-js-react-components/src/widget/tab/tab-content";
	import SyntheticEvent = React.SyntheticEvent;
	export const PAR_MODE_CONSULTER: string;
	export const PAR_MODE_EDITER: string;
	export const PAR_MODE_CREER: string;
	/**
	 * Collection des datasources de la page fiche partenaire
	 */
	export class IdentiteTabDatasourcesService {
	    dataSourceNationalite: DataSource<PaysMetier>;
	    constructor(dataSourceNationalite?: DataSource<PaysMetier>);
	}
	/**
	 * interface du formulaire d'identité d'un partenaire.
	 */
	export interface IdentiteTabProps extends TabContentProps {
	    /**
	     * collection des datasources service initialiser dans la Page
	     */
	    dataSourcesService: IdentiteTabDatasourcesService;
	    /**
	     * Fonction de navigation transmisse par la page lors de soumission
	     */
	    onSubmit: (data: any) => void;
	    /**
	     * Fonction de navigation transmisse par la page de l'annulation
	     */
	    onCancel: React.MouseEventHandler<HTMLElement>;
	    /**
	     * Mode edition ou consultation du formulaire
	     */
	    pageAttributes: {
	        id: string;
	        mode: string;
	        isVIP: boolean;
	    };
	}
	/**
	 * Page d'administration des secteurs. L'ajout ou l'édition d'un secteur se fait dans une fenêtre modale.
	 */
	export class IdentiteTab extends TabContent<IdentiteTabProps, any> {
	    private listeCivilites;
	    private listeIsClient;
	    private listeSatisfactions;
	    private partenaire;
	    private formPartenaire;
	    private fieldSetCivilite;
	    private fieldSetAdresses;
	    private fieldSetCoordAssist;
	    private fieldSetDivers;
	    private fieldSetSatisfaction;
	    private fieldSetCoordonnees;
	    private villeAutoComplete;
	    private dataSourceNationalite;
	    private dataSourcePays;
	    private dataSourceVille;
	    private dataSourceCivilite;
	    private dataSourceSatisfactions;
	    private dataSourceIsClient;
	    private dataSourceOtherTelephones;
	    readonly props: Readonly<IdentiteTabProps>;
	    private formI18n;
	    private uploadFileI18n;
	    constructor(props: IdentiteTabProps, context: any);
	    componentDidUpdate(prevProps: any, prevState: any, prevContext: any): void;
	    componentDidMount(): void;
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	    /**
	     * Alimente le datasource des pays
	     */
	    setPays(pays: PaysMetier[]): void;
	    /**
	     * Alimente le datasource des villes
	     */
	    setVilles(villes: VilleMetier[]): void;
	    /**
	     * Alimente la fiche de partenaire
	     */
	    setPartenaire(partenaire: PartenaireMetier): void;
	    /**
	     * Rendu des boutons de bas de page
	     * @returns {any}
	     */
	    renderButton(): JSX.Element;
	    /**
	     * Rendu du bouton Annuler
	     * @returns {any}
	     */
	    renderButtonCancel(): JSX.Element;
	    /**
	     * Bloc global  fieldset du formulaire
	     */
	    getFieldset(): any[];
	    /**
	     * Ajout des blocs accordions au formulaire
	     *
	     */
	    getAccordions(fieldsets: any): JSX.Element[];
	    /**
	     * bloc Fieldset Type
	     */
	    renderFieldsetType(): JSX.Element;
	    /**
	     * bloc Fieldset Civilite
	     */
	    renderFieldsetCivilite(): JSX.Element;
	    /**
	     * Bloc Fieldset Coordonnées
	     */
	    renderFieldsetCoordonnee(): JSX.Element;
	    /**
	     * Méthode permettant d'ajouter un autre téléphone
	     */
	    ajouterAutreTelephone(): void;
	    /**
	     * Méthode permettant de supprimer un autre téléphone
	     */
	    supprimerAutreTelephone(item: any): void;
	    /**
	     *
	     * @returns {[ any, any, any, any, any ]}
	     */
	    renderOtherPhones(): JSX.Element;
	    /**
	     * Bloc Fieldset adresse
	     */
	    renderFieldsetAdresse(): JSX.Element;
	    /**
	     * Bloc Fieldset coordonnee assistance
	     */
	    renderFieldsetCoordAssistance(): JSX.Element;
	    /**
	     * Bloc Fieldset divers
	     */
	    renderFieldsetDivers(): JSX.Element;
	    /**
	     * Bloc Fieldset satisfaction
	     */
	    renderFieldsetSatisfaction(): JSX.Element;
	    /**
	     * Rendu fiche partenaire avec accordions
	     * @param formI18n
	     * @param uploadFile
	     * @returns {any}
	     */
	    private renderPartenaireVip();
	    /**
	     * Rendu fiche partenaire sans accordions
	     * @param formI18n
	     * @param uploadFile
	     * @returns {any}
	     */
	    renderPartenaire(): JSX.Element;
	    /**
	     * Indique si les autres champs que les coordonnées doivent être en lecture seule :
	     * - formulaire en lecture seule : tous les champs sont désactivésupdateFields
	     * - formulaire en modification :
	     *  - partenaire VIP : sauf en création, seules les coordonnées sont modifiables
	     *  - partenaire non VIP : toute la fiche est modifiable
	     * @return {boolean} true lorsque les champs qui ne font pas partie du bloc des coordonnées doivent être désactivés
	     */
	    private isNonContactFieldDisabled();
	    /**
	     * Gestion du changement d'état de la case à cocher "VIP"
	     * @param e évènement
	     */
	    handleIsVIPChange(e?: SyntheticEvent<HTMLElement>): void;
	    /**
	     * Bascule des champs en mode readONly/Modification
	     * @param isReadOnly
	     */
	    private toggleReadOnly(isReadOnly);
	    /**
	     * Génère le rendu de l'aperçu correspondant au fichier en consultation :
	     *  - sous forme d'une balise HTML img lorsque le fichier est une image
	     *  - sous forme d'un lien HTML lorsque le fichier n'est pas une image
	     * @param file fichier sélectionné
	     * @returns {*}
	     */
	    private renderPreviewUploadFile(file);
	}
	
}

declare module "applitutoriel-js-common/src/views/par/par-fpa/produits-tab" {
	import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
	import { HornetComponent } from "hornet-js-react-components/src/widget/component/hornet-component";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { ProduitMetier }  from "applitutoriel-js-common/src/models/pro/pro-mod";
	export interface ProduitsTabProps extends HornetComponentProps {
	    dataSource: PaginateDataSource<ProduitMetier>;
	}
	/**
	 * Page d'administration des secteurs. L'ajout ou l'édition d'un secteur se fait dans une fenêtre modale.
	 */
	export class ProduitsTab extends HornetComponent<ProduitsTabProps, any> {
	    private tabProdI18n;
	    constructor(props: ProduitsTabProps, context?: any);
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	}
	
}

declare module "applitutoriel-js-common/src/views/par/par-fpa/secteurs-tab" {
	import { TabContent } from "hornet-js-react-components/src/widget/tab/tab-content";
	import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
	import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
	import { SecteurMetier }  from "applitutoriel-js-common/src/models/adm/sec-mod";
	export interface SecteursTabProps extends HornetComponentProps {
	    dataSource: PaginateDataSource<SecteurMetier>;
	}
	/**
	 * Page d'administration des secteurs. L'ajout ou l'édition d'un secteur se fait dans une fenêtre modale.
	 */
	export class SecteursTab extends TabContent<SecteursTabProps, any> {
	    private secteurI18n;
	    constructor(props?: SecteursTabProps, context?: any);
	    /**
	     * @inheritDoc
	     */
	    render(): JSX.Element;
	    /**
	     * exemple de tri multicolonnes
	     */
	    private sortMulti();
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/data/adm/secteur-service-data-mock-impl" {
	import { ApplitutorielSecteursServiceImpl } from "applitutoriel-js-common/src/services/applitutoriel-secteurs-service-impl";
	import { AdministrationSecteurService } from "applitutoriel-js-common/src/services/data/adm/adm-secteur-service";
	import { Promise } from "hornet-js-utils/src/promise-api";
	/**
	 * Implementation des services pour les secteurs
	 * @class
	 * @implements {AdministrationSecteurService}
	 * @extends {ServiceApi}
	 */
	export class SecteurServiceDataMockImpl extends ApplitutorielSecteursServiceImpl implements AdministrationSecteurService {
	    /**
	     * liste tous les secteurs
	     * @return Promise
	     */
	    lister(): Promise<any>;
	    /**
	     * supprime un secteur
	     * @param {number} id identifiant du secteur à supprimer
	     * @return Promise
	     */
	    supprimer(id: number): Promise<any>;
	    /**
	     * creer un nouveau secteur
	     * @param {object} secteur secteur à créer
	     * @return Promise
	     */
	    creer(secteur: any): Promise<any>;
	    /**
	     * creer un nouveau secteur
	     * @param {number} id identifiant du secteur à supprimer
	     * @param {object} secteur secteur à modifier
	     * @return Promise
	     */
	    modifier(id: number, secteur: any): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/data/auth/auth-service-data-impl-mock" {
	import { AuthService } from "applitutoriel-js-common/src/services/data/auth/auth-service";
	import { Response } from "superagent";
	import { Promise } from "hornet-js-utils/src/promise-api";
	/**
	 * Implementation des services pour l'authentification
	 * @class
	 * @implements {AuthService}
	 * @extends {ServiceApi}
	 */
	export class AuthServiceDataMockImpl extends AuthService {
	    /**
	     * recherche de l'identité
	     * @param {object} data
	     */
	    auth(data: any): Promise<any>;
	    saveToken(response: Response): void;
	    getToken(): any;
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/data/ref/ref-pays-service-data-mock-impl" {
	import { ReferentielPaysService } from "applitutoriel-js-common/src/services/data/ref/ref-pays-service";
	import { Promise } from "hornet-js-utils/src/promise-api";
	/**
	 * Implementation des services pour les referentiels
	 * @class
	 * @implements {ReferentielPaysService}
	 */
	export class ReferentielPaysServiceDataMockImpl extends ReferentielPaysService {
	    /**
	     * liste les pays
	     * Utilisé :
	     * - hornet
	     * @returns {Promise<object>}
	     */
	    listerPays(): Promise<any>;
	    /**
	     * liste les nationnalités
	     * Utilisé :
	     * - hornet
	     * - hornet-lite
	     * @param {string} nationalite
	     * @returns {Promise<object>}
	     */
	    rechercherNationalites(nationalite?: string): Promise<any>;
	    /**
	     * liste les villes
	     * Utilisé :
	     * - hornet
	     * @returns {Promise<object>}
	     */
	    listerVilles(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/data/par/fiche-partenaire-service-data-mock-impl" {
	import { SpinnerType } from "hornet-js-core/src/services/hornet-superagent-request";
	import { FichePartenairePageService } from "applitutoriel-js-common/src/services/page/par/par-fpa-service";
	import { Promise } from "hornet-js-utils/src/promise-api";
	/**
	 * Implementation des services pour les partenaires
	 * @class
	 * @implements {FichePartenaireService}
	 * @extends {ServiceApi}
	 */
	export class FichePartenaireServiceDataMockImpl extends FichePartenairePageService {
	    /** service de gestion des pays */
	    private paysService;
	    /**
	     * liste les produit
	     * @param {number} id identifiant du partenaire à récupérer
	     * @return Promise
	     */
	    fichePartenaire(id: number): Promise<any>;
	    /**
	     * Récupère les données nécessaires à l'écran de fiche partenaire
	     * @return Promise<object>
	     */
	    getFormData(): Promise<any>;
	    rechercherNationalites(nationalite?: string, spinner?: SpinnerType): Promise<any>;
	    /**
	     * liste tous les secteurs
	     * @return Promise
	     */
	    listerSecteurs(): Promise<any>;
	    /**
	     * Cration / Modifiaction d'un partenaire existant
	     * @param {number} id identifiant du partenaire à modifier
	     * @param {object} partenaire partenaire à modifier
	     * @return Promise<object>
	     */
	    modifier(id: number, partenaire: any): Promise<any>;
	    /**
	     * Récupère la photo associée partenaire
	     * @param {number} id identifiant du partenaire dont on souhaite la photo
	     * @return Promise<object>
	     */
	    lirePhoto(id: number, res?: NodeJS.WritableStream): Promise<any>;
	    /**
	     * node >v10 does not parse JSON buffer too a buffer so we must detect and create a buffer
	     * @param buff
	     * @returns {*}
	     */
	    protected convertBufferToArray(buff: any): any;
	    /**
	     * convertion d'un partenaire
	     * @param {object} webPartenaire
	     * @returns {object}
	     */
	    protected convertToRemotePartenaire(webPartenaire: any): any;
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/data/par/partenaire-service-data-mock-impl" {
	import { MediaType } from "hornet-js-core/src/protocol/media-type";
	import { PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";
	import { PartenaireRechercheParameter } from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
	import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
	import { Promise } from "hornet-js-utils/src/promise-api";
	/**
	 * Implementation des services pour les partenaires
	 * @class
	 * @implements {RecherchePartenaireService}
	 * @extends {ServiceApi}
	 */
	export class PartenaireServiceDataMockImpl extends PartenaireService {
	    /**
	     * liste les produits
	     * @return Promise
	     */
	    rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any>;
	    supprimer(id: any): Promise<any>;
	    supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any>;
	    exporter(reqMimeType: MediaType): Promise<any>;
	    exporterODF(reqMimeType: MediaType): Promise<any>;
	    /**
	     * Cration / Modifiaction d'un partenaire existant
	     * @param {number} id identifiant du partenaire à modifier
	     * @param {object} partenaire partenaire à modifier
	     * @return Promise<object>
	     */
	    modifier(id: number, partenaire: any): Promise<any>;
	    /**
	     * Récupère la photo associée partenaire
	     * @param {number} id identifiant du partenaire dont on souhaite la photo
	     * @return Promise<object>
	     */
	    lirePhoto(idPartenaire: number): Promise<any>;
	    /**
	     *
	     * @param idPartenaire
	     */
	    fichePartenaire(id: number): Promise<any>;
	    getFormData(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/page/adm/secteur-repartition-service-page-mock-impl" {
	import { FicheProduitService } from "applitutoriel-js-common/src/services/page/adm/adm-fpo-service-page";
	import { ServicePage } from "hornet-js-core/src/services/service-page";
	import { Promise } from "hornet-js-utils/src/promise-api";
	/**
	 * Implementation des services pour les secteurs
	 * @class
	 * @implements {AdministrationSecteurService}
	 * @extends {ServiceApi}
	 */
	export class SecteurRepartitionProduitServicePageMockImpl extends ServicePage implements FicheProduitService {
	    /**
	     * liste les produits
	     * @return Promise
	     */
	    listerProduits(): Promise<any>;
	    /**
	     * liste tous les secteurs
	     * @return Promise
	     */
	    repartition(): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/page/adm/secteur-service-page-mock-impl" {
	import { AdministrationSecteurService } from "applitutoriel-js-common/src/services/data/adm/adm-secteur-service";
	import { Promise } from "hornet-js-utils/src/promise-api";
	import { ServicePage } from "hornet-js-core/src/services/service-page";
	/**
	 * Implementation des services pour les secteurs
	 * @class
	 * @implements {AdministrationSecteurService}
	 * @extends {ServiceApi}
	 */
	export class SecteurServicePageMockImpl extends ServicePage implements AdministrationSecteurService {
	    /**
	     * liste tous les secteurs
	     * @return Promise
	     */
	    lister(): Promise<any>;
	    /**
	     * supprime un secteur
	     * @param {number} id identifiant du secteur à supprimer
	     * @return Promise
	     */
	    supprimer(id: number): Promise<any>;
	    /**
	     * creer un nouveau secteur
	     * @param {object} secteur secteur à créer
	     * @return Promise
	     */
	    creer(secteur: any): Promise<any>;
	    /**
	     * creer un nouveau secteur
	     * @param {number} id identifiant du secteur à supprimer
	     * @param {object} secteur secteur à modifier
	     * @return Promise
	     */
	    modifier(id: number, secteur: any): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/page/auth/auth-service-page-impl-mock" {
	import { AuthService } from "applitutoriel-js-common/src/services/data/auth/auth-service";
	import { Promise } from "hornet-js-utils/src/promise-api";
	import { Response } from "superagent";
	/**
	 * Implementation des services pour l'authentification
	 * @class
	 * @implements {AuthService}
	 * @extends {ServiceApi}
	 */
	export class AuthServiceMockImpl extends AuthService {
	    /**
	     * recherche de l'identité
	     * @param {object} data
	     */
	    auth(data: any): Promise<any>;
	    saveToken(response: Response): void;
	    getToken(): any;
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/page/par/fiche-partenaire-service-page-mock-impl" {
	import { SpinnerType } from "hornet-js-core/src/services/hornet-superagent-request";
	import { FichePartenairePageService } from "applitutoriel-js-common/src/services/page/par/par-fpa-service";
	import { Promise } from "hornet-js-utils/src/promise-api";
	/**
	 * Implementation des services pour les partenaires
	 * @class
	 * @implements {FichePartenaireService}
	 * @extends {ServiceApi}
	 */
	export class FichePartenaireServicePageMockImpl extends FichePartenairePageService {
	    /** service de gestion des pays */
	    private paysService;
	    /**
	     * liste les produit
	     * @param {number} id identifiant du partenaire à récupérer
	     * @return Promise
	     */
	    fichePartenaire(id: number): Promise<any>;
	    /**
	     * Récupère les données nécessaires à l'écran de fiche partenaire
	     * @return Promise<object>
	     */
	    getFormData(): Promise<any>;
	    rechercherNationalites(nationalite?: string, spinner?: SpinnerType): Promise<any>;
	    /**
	     * liste tous les secteurs
	     * @return Promise
	     */
	    listerSecteurs(): Promise<any>;
	    /**
	     * Cration / Modifiaction d'un partenaire existant
	     * @param {number} id identifiant du partenaire à modifier
	     * @param {object} partenaire partenaire à modifier
	     * @return Promise<object>
	     */
	    modifier(id: number, partenaire: any): Promise<any>;
	    /**
	     * Récupère la photo associée partenaire
	     * @param {number} id identifiant du partenaire dont on souhaite la photo
	     * @return Promise<object>
	     */
	    lirePhoto(id: number, res?: NodeJS.WritableStream): Promise<any>;
	    /**
	     * node >v10 does not parse JSON buffer too a buffer so we must detect and create a buffer
	     * @param buff
	     * @returns {*}
	     */
	    protected convertBufferToArray(buff: any): any;
	    /**
	     * convertion d'un partenaire
	     * @param {object} webPartenaire
	     * @returns {object}
	     */
	    protected convertToRemotePartenaire(webPartenaire: any): any;
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/page/par/partenaire-service-page-mock-impl" {
	import { MediaType } from "hornet-js-core/src/protocol/media-type";
	import { PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";
	import { PartenaireRechercheParameter } from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
	import { RecherchePartenaireService } from "applitutoriel-js-common/src/services/page/par/par-rpa-service";
	import { Promise } from "hornet-js-utils/src/promise-api";
	/**
	 * Implementation des services pour les partenaires
	 * @class
	 * @implements {RecherchePartenaireService}
	 * @extends {ServiceApi}
	 */
	export class PartenaireServicePageMockImpl extends RecherchePartenaireService {
	    /**
	     * liste les produits
	     * @return Promise
	     */
	    rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any>;
	    supprimer(id: any): Promise<any>;
	    supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any>;
	    exporter(reqMimeType: MediaType): Promise<any>;
	    exporterODF(reqMimeType: MediaType): Promise<any>;
	    /**
	     * Cration / Modifiaction d'un partenaire existant
	     * @param {number} id identifiant du partenaire à modifier
	     * @param {object} partenaire partenaire à modifier
	     * @return Promise<object>
	     */
	    modifier(id: number, partenaire: any): Promise<any>;
	    /**
	     * Récupère la photo associée partenaire
	     * @param {number} id identifiant du partenaire dont on souhaite la photo
	     * @return Promise<object>
	     */
	    lirePhoto(idPartenaire: number): Promise<any>;
	    /**
	     *
	     * @param idPartenaire
	     */
	    fichePartenaire(id: number): Promise<any>;
	    getFormData(): Promise<any>;
	    listerSecteurs(): Promise<any>;
	    supprimerPage(id: any): Promise<any>;
	}
	
}

declare module "applitutoriel-js-common/src/mock/services/page/ref/ref-pays-service-page-mock-impl" {
	import { ReferentielPaysService } from "applitutoriel-js-common/src/services/page/ref/ref-pays-service";
	import { Promise } from "hornet-js-utils/src/promise-api";
	/**
	 * Implementation des services pour les referentiels
	 * @class
	 * @implements {ReferentielPaysService}
	 */
	export class ReferentielPaysServicePageMockImpl extends ReferentielPaysService {
	    /**
	     * liste les pays
	     * Utilisé :
	     * - hornet
	     * @returns {Promise<object>}
	     */
	    listerPays(): Promise<any>;
	    /**
	     * liste les nationnalités
	     * Utilisé :
	     * - hornet
	     * - hornet-lite
	     * @param {string} nationalite
	     * @returns {Promise<object>}
	     */
	    rechercherNationalites(nationalite?: string): Promise<any>;
	    /**
	     * liste les villes
	     * Utilisé :
	     * - hornet
	     * @returns {Promise<object>}
	     */
	    listerVilles(): Promise<any>;
	}
	
}
