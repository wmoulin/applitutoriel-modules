import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { ApplitutorielSecteursServiceImpl } from "applitutoriel-js-common/src/services/applitutoriel-secteurs-service-impl";
import { URL_SECTEURS } from "applitutoriel-js-common/src/utils/urls";
import { AdministrationSecteurServiceData } from "applitutoriel-js-common/src/services/data/adm/adm-secteur-service-data";
import { Promise } from "hornet-js-utils/src/promise-api";
import * as secteurs from "applitutoriel-js-common/src/resources/mock/adm/adm-lst-data.json";
import { Response } from 'superagent';

const logger: Logger = Utils.getLogger("applitutoriel-js-common.mock.services.data.adm.secteur-service-data-mock-impl");

/**
 * Implementation des services pour les secteurs
 * @class
 * @implements {AdministrationSecteurService}
 * @extends {ServiceApi}
 */
export class SecteurServiceDataMockImpl extends AdministrationSecteurServiceData {
    
    getToken(): String {
        return "";
    }
    saveToken(response: Response): void {
        return ;
    }
    
    /**
     * liste tous les secteurs
     * @return Promise
     */
    lister(): Promise<any> {
        logger.trace("SERVICES MOCK - lister");
        return Promise.resolve((<any> secteurs).data);

    }

    /**
     * supprime un secteur
     * @param {number} id identifiant du secteur à supprimer
     * @return Promise
     */
    supprimer(id: number): Promise<any> {
        logger.trace("SERVICES - supprimer : ", id);
        return this.fetch({method: "delete", url: this.buildUrl(URL_SECTEURS + "/" + id)});
    }

    /**
     * creer un nouveau secteur
     * @param {object} secteur secteur à créer
     * @return Promise
     */
    creer(secteur: any): Promise<any> {
        logger.trace("SERVICES - creer : ", secteur);

        return this.fetch({
            method: "post",
            url: this.buildUrl(URL_SECTEURS),
            data: secteur
        });
    }

    /**
     * creer un nouveau secteur
     * @param {number} id identifiant du secteur à supprimer
     * @param {object} secteur secteur à modifier
     * @return Promise
     */
    modifier(id: number, secteur: any): Promise<any> {
        logger.trace("SERVICES - modifier : ", id, secteur);

        return this.fetch({
            method: "put",
            url: this.buildUrl(URL_SECTEURS + "/" + id),
            data: secteur,
            cacheLinkKey: [this.buildUrl(URL_SECTEURS)]
        });
    }
}
