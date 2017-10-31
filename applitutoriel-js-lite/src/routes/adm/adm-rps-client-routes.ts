import { AbstractRoutes, PageRouteInfos, DataRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import { Roles } from "applitutoriel-js-common/src/utils/roles";
import { RepartitionPage } from "applitutoriel-js-common/src/views/adm/adm-rps-page";
import { FicheProduitService } from "applitutoriel-js-common/src/services/page/adm/adm-fpo-service-page";
import { Injector } from "hornet-js-core/src/inject/injector";

export default class ProduitsRoutesClient extends AbstractRoutes {
    constructor() {
        super();

        /* Route des pages */
        this.addPageRoute("/",
            () => new PageRouteInfos(RepartitionPage, null, Injector.getRegistered(FicheProduitService)),
            Roles.ADMIN
        );
    }
}
