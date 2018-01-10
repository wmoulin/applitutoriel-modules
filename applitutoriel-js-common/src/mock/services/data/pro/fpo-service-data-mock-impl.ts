import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { Promise } from "hornet-js-utils/src/promise-api";
import { ProduitMetier } from "applitutoriel-js-common/src/models/pro/pro-mod";
import { FicheProduitService } from "applitutoriel-js-common/src/services/page/adm/adm-fpo-service-page";

const logger: Logger = Utils.getLogger("applitutoriel-js-common.mock.services.data.pro.fpo-service-data-mock-impl");

/**
 * Implementation des services pour les produits
 * @class
 * @implements {FicheProduitService}
 */
export class FicheProduitServiceDataMockImpl extends FicheProduitService {

    listerProduits(): Promise<Array<ProduitMetier>> {
        return Promise.resolve(null);
    }

    lister(): Promise<Array<ProduitMetier>> {
        return Promise.resolve(null);
    }

    repartition(): Promise<any> {
        return Promise.resolve(null);
    }
}