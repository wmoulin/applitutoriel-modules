/**
 * Interface des services pour les referentiels
 * @interface
 */
export abstract class ReferentielPaysService {
    abstract listerPays(): Promise<any>;

    abstract rechercherNationalites(nationalite: string): Promise<any>;

    abstract listerVilles(): Promise<any>;
}
