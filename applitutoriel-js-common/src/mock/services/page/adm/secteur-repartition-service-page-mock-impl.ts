import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { AdministrationSecteurService } from "applitutoriel-js-common/src/services/data/adm/adm-secteur-service";
import * as secteurs from "applitutoriel-js-common/src/resources/mock/adm/adm-rps-data.json";
import { FicheProduitService } from "applitutoriel-js-common/src/services/page/adm/adm-fpo-service-page";
const logger: Logger = Utils.getLogger("applitutoriel.services.page.adm.secteur-service-page-impl");
import { ServicePage } from "hornet-js-core/src/services/service-page";
import { Promise } from "hornet-js-utils/src/promise-api";
/**
 * Implementation des services pour les secteurs
 * @class
 * @implements {AdministrationSecteurService}
 * @extends {ServiceApi}
 */
export class SecteurRepartitionProduitServicePageMockImpl extends ServicePage implements FicheProduitService {

    /**
     * liste les produits
     * @return Promise
     */
    listerProduits(): Promise<any> {
        return Promise.resolve();
    };

    /**
     * liste tous les secteurs
     * @return Promise
     */
    repartition(): Promise<any> {
        logger.trace("SERVICES - lister");
        return Promise.resolve((<any>secteurs).data);
    }
}
