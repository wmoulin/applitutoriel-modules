import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { ApplitutorielSecteursServiceImpl } from "applitutoriel-js-common/src/services/applitutoriel-secteurs-service-impl";
import { URL_SECTEURS } from "applitutoriel-js-common/src/utils/urls";
import { AdministrationSecteurService } from "applitutoriel-js-common/src/services/page/adm/adm-secteur-service";

const logger: Logger = Utils.getLogger("applitutoriel.services.adm.secteur-service-page-impl");

/**
 * Implementation des services pour les secteurs
 * @class
 * @implements {AdministrationSecteurService}
 * @extends {ServiceApi}
 */
export class SecteurServiceImpl extends AdministrationSecteurService {

    /**
     * liste tous les secteurs
     * @return Promise
     */
    lister() : Promise<any> {
        logger.trace("SERVICES - lister");
        return this.fetch({method : "get", url : this.buildUrl(URL_SECTEURS)});
    }

    /**
     * supprime un secteur
     * @param {number} id identifiant du secteur à supprimer
     * @return Promise
     */
    supprimer(id:number) : Promise<any> {
        logger.trace("SERVICES - supprimer : ", id);
        return this.fetch({
            method : "delete",
            url : this.buildUrl(URL_SECTEURS + "/" + id),
            cacheLinkKey: [this.buildUrl(URL_SECTEURS)]});
    }

    /**
     * creer un nouveau secteur
     * @param {object} secteur secteur à créer
     * @return Promise
     */
    creer(secteur:any) : Promise<any> {
        logger.trace("SERVICES - creer : ", secteur);

        return this.fetch({
            method : "post",
            url : this.buildUrl(URL_SECTEURS),
            data: secteur
        });
    }

    /**
     * creer un nouveau secteur
     * @param {number} id identifiant du secteur à supprimer
     * @param {object} secteur secteur à modifier
     * @return Promise
     */
    modifier(id:number, secteur:any) : Promise<any> {
        logger.trace("SERVICES - modifier : ", id, secteur);

        return this.fetch({
            method : "put",
            url : this.buildUrl(URL_SECTEURS + "/" + id),
            data: secteur,
            cacheLinkKey: [this.buildUrl(URL_SECTEURS)]
        });
    }
}
