import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { DataRouteInfos, PUBLIC_ROUTE } from "hornet-js-core/src/routes/abstract-routes";
import { ListerProduits } from "applitutoriel-js-common/src/actions/pro/pro-actions";
import { Repartition } from "applitutoriel-js-common/src/actions/adm/adm-rps-actions";
import { FicheProduitService } from "applitutoriel-js-common/src/services/page/adm/adm-fpo-service-page";

import ProduitsRoutesClient from "src/routes/adm/adm-rps-client-routes";
import { URL_PRODUITS } from "applitutoriel-js-common/src/utils/urls";
import { Injector } from "hornet-js-core/src/inject/injector";

const logger: Logger = Utils.getLogger("applitutoriel.src.routes.adm.adm-rps-server-routes");

export default class ProduitsRoutesServer extends ProduitsRoutesClient {

    constructor() {
        super();

        this.addDataRoute(URL_PRODUITS,
            () => new DataRouteInfos(Repartition, null, Injector.getRegistered(FicheProduitService))
        );

        this.addDataRoute("/",
            () => new DataRouteInfos(ListerProduits, null, Injector.getRegistered(FicheProduitService)),
            PUBLIC_ROUTE
        );
    }
}

