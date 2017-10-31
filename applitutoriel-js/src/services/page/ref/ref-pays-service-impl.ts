import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { ServiceRequest } from "hornet-js-core/src/services/service-request";
import { HornetRequest, SpinnerType } from "hornet-js-core/src/services/hornet-superagent-request";
import {
    URL_REF,
    URL_PAYS,
    URL_REF_VILLES,
    URL_REF_NATIONALITE
} from "applitutoriel-js-common/src/utils/urls";
import { ReferentielPaysService } from "applitutoriel-js-common/src/services/page/ref/ref-pays-service";

const logger: Logger = Utils.getLogger("applitutoriel.services.par.ref-pays-service-page-impl");

/**
 * Implementation des services pour les referentiels
 * @class
 * @implements {ReferentielPaysService}
 */
export class ReferentielPaysServiceImpl extends ServiceRequest implements ReferentielPaysService {

    /**
     * liste les pays
     * Utilisé :
     * - hornet
     * @returns {Promise<object>}
     */
    listerPays(): Promise<any> {
        logger.trace("SERVICES - listerPays");
        return this.fetch({
            method: "get",
            url: this.buildUrl(URL_REF + URL_PAYS),
            noCached: false,
            timeToLiveInCache: 3600
        });
    }

    /**
     * liste les nationnalités
     * Utilisé :
     * - hornet
     * - hornet-lite
     * @param {string} nationalite
     * @returns {Promise<object>}
     */
    rechercherNationalites(nationalite?: string, spinner: SpinnerType = SpinnerType.Default): Promise<any> {
        logger.trace("SERVICES - rechercherNationalites : ", nationalite);

        let request: HornetRequest = {
            method: "get",
            url: this.buildUrl(URL_REF + URL_REF_NATIONALITE),
            spinnerType: spinner
        };

        if (nationalite) {
            request.method = "post";
            request.data = {nationnalite: nationalite};
            request.url = request.url + "/recherche"
        }

        return this.fetch(request);
    }

    /**
     * liste les villes
     * Utilisé :
     * - hornet
     * @returns {Promise<object>}
     */
    listerVilles(): Promise<any> {
        logger.trace("SERVICES - listerVilles");
        return this.fetch({
            method: "get",
            url: this.buildUrl(URL_REF + URL_REF_VILLES),
            noCached: false,
            timeToLiveInCache: 3600
        });
    }
}