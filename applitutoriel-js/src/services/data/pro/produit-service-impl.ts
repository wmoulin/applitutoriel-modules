import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { ServiceRequest } from "hornet-js-core/src/services/service-request";
import { ProduitService } from "applitutoriel-js-common/src/services/data/pro/produit-service";
import { URL_PRODUITS } from "applitutoriel-js-common/src/utils/urls";

const logger: Logger = Utils.getLogger("applitutoriel.services.adm.secteur-service-page-impl");

export class ProduitServiceImpl extends ServiceRequest implements ProduitService {

    /**
     * @inheritDoc
     */
    lister() : Promise<any> {
        logger.trace("SERVICES - lister");
        return this.fetch({method : "get", url : this.buildUrl(URL_PRODUITS)});
    }
}
