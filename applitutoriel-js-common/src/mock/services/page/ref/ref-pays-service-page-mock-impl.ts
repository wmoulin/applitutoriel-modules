import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";

import { ReferentielPaysService } from "applitutoriel-js-common/src/services/page/ref/ref-pays-service";

import * as villes from "applitutoriel-js-common/src/resources/mock/par/par-rpa-villes.json";
import * as pays from "applitutoriel-js-common/src/resources/mock/par/par-pays-data.json";
import { Promise } from "hornet-js-utils/src/promise-api";
const logger: Logger = Utils.getLogger("applitutoriel-js-common.mock.services.page.ref.ref-pays-service-page-mock-impl");

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
    listerPays(): Promise<any> {
        logger.trace("SERVICES - listerPays");
        return Promise.resolve((<any>pays).data);
    }

    /**
     * liste les nationnalités
     * Utilisé :
     * - hornet
     * - hornet-lite
     * @param {string} nationalite
     * @returns {Promise<object>}
     */
    rechercherNationalites(nationalite?: string): Promise<any> {
        logger.trace("SERVICES - rechercherNationalites : ", nationalite);

        return Promise.resolve((<any>pays).data);
    }

    /**
     * liste les villes
     * Utilisé :
     * - hornet
     * @returns {Promise<object>}
     */
    listerVilles(): Promise<any> {
        return Promise.resolve((<any>villes).data);
    }
}