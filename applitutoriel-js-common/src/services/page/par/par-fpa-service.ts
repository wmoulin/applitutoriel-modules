import { ServiceRequest } from "hornet-js-core/src/services/service-request";

/**
 * Interface des services pour les partenaires
 * @interface
 */
export abstract class FichePartenairePageService extends ServiceRequest {
    abstract fichePartenaire(id: number): Promise<any>;

    abstract getFormData(): Promise<any>;

    abstract modifier(id: number, partenaire, progress: Function): Promise<any>;

    abstract lirePhoto(idPhoto): Promise<any>;

    abstract rechercherNationalites(nationalite: string): Promise<any>;

    abstract listerSecteurs(): Promise<any>;
}