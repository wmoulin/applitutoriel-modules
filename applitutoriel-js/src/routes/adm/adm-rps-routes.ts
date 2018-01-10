import { AbstractRoutes, PageRouteInfos, DataRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import { Roles } from "applitutoriel-js-common/src/utils/roles";
import { RepartitionPage } from "applitutoriel-js-common/src/views/adm/adm-rps-page";
import { Repartition } from "applitutoriel-js-common/src/actions/adm/adm-rps-actions";
import { FicheProduitServiceImpl } from "src/services/page/adm/adm-fpo-service-page-impl";
import { URL_PRODUITS } from "applitutoriel-js-common/src/utils/urls";

export default class ProduitsRoutes extends AbstractRoutes {
    constructor() {
        super();

        /* Route des pages */
        this.addPageRoute("/",
            () => new PageRouteInfos(RepartitionPage, null, FicheProduitServiceImpl),
            Roles.ADMIN
        );

        /* Route des datas */
        this.addDataRoute(URL_PRODUITS,
            () => new DataRouteInfos(Repartition, null, FicheProduitServiceImpl),
            Roles.ADMIN
        );
    }
}
