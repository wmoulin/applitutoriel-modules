import { ListerProduits } from "applitutoriel-js-common/src/actions/pro/pro-actions";

import { AbstractRoutes, PageRouteInfos, DataRouteInfos, PUBLIC_ROUTE } from "hornet-js-core/src/routes/abstract-routes";
import { Roles } from "applitutoriel-js-common/src/utils/roles";
import { ListeProduitsPage } from "applitutoriel-js-common/src/views/pro/pro-lst-page";

import { SecteurServiceImpl } from "src/services/page/sec/secteur-service-page-impl";
import { ProduitServiceImpl } from "src/services/data/pro/produit-service-impl";

export default class PartenairesRoutes extends AbstractRoutes {
    constructor() {
        super();


        /* Routes des pages */
        /* Nouvelle page de recherche avec critères par défaut */
        this.addPageRoute("/",
            () => new PageRouteInfos(ListeProduitsPage, null, SecteurServiceImpl),
            Roles.EVERYONE
        );
        /* Routes des pages */
        /* Nouvelle page de recherche avec critères par défaut */
        this.addDataRoute("/",
            () => new DataRouteInfos(ListerProduits, null, ProduitServiceImpl),
            PUBLIC_ROUTE
        );
    }
}
