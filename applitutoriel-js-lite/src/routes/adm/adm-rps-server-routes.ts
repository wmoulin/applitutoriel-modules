import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { DataRouteInfos, PUBLIC_ROUTE } from "hornet-js-core/src/routes/abstract-routes";
import { ListerProduits } from "applitutoriel-js-common/src/actions/pro/pro-actions";
import { Repartition } from "applitutoriel-js-common/src/actions/adm/adm-rps-actions";
import { FicheProduitServiceImpl } from "src/services/data/pro/fpo-service-data-impl";
import ProduitsRoutesClient from "src/routes/adm/adm-rps-client-routes";
import { URL_PRODUITS } from "applitutoriel-js-common/src/utils/urls";

const logger: Logger = Utils.getLogger("applitutoriel.src.routes.adm.adm-rps-server-routes");

export default class ProduitsRoutesServer extends ProduitsRoutesClient {

    constructor() {
        super();

        this.addDataRoute(URL_PRODUITS,
            () => new DataRouteInfos(Repartition, null, FicheProduitServiceImpl)
        );

        this.addDataRoute("/",
            () => new DataRouteInfos(ListerProduits, null, FicheProduitServiceImpl),
            PUBLIC_ROUTE
        );
    }
}

