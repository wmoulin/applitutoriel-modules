import { ApplitutorielSecteursServiceImpl } from "applitutoriel-js-common/src/services/applitutoriel-secteurs-service-impl";

/**
 * Interface des services pour les secteurs
 * @interface
 */
export abstract class AdministrationSecteurServiceData extends ApplitutorielSecteursServiceImpl {
    abstract lister(): Promise<any>;

    abstract supprimer(id: number): Promise<any>;

    abstract creer(secteur: any): Promise<any>;

    abstract modifier(id: number, secteur: any): Promise<any>;
}
