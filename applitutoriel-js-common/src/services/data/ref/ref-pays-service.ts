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
