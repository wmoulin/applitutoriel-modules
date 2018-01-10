import { AbstractRoutes, PageRouteInfos, PUBLIC_ROUTE } from "hornet-js-core/src/routes/abstract-routes";
import {
    URL_PARTENAIRES,
    URL_REF,
    URL_SECTEURS,
    URL_PRODUITS,
    URL_REPARTITIONS,
    URL_CONTACT
} from "applitutoriel-js-common/src/utils/urls";
import { HomePage } from "applitutoriel-js-common/src/views/gen/gen-hom-page";
import { AidePage } from "applitutoriel-js-common/src/views/gen/gen-aid-page";
import { PlanAppliPage } from "applitutoriel-js-common/src/views/nav/nav-pap-page";
import { AccessibilitePage } from "applitutoriel-js-common/src/views/gen/gen-acb-page";
import { DeclarationconformitePage } from "applitutoriel-js-common/src/views/gen/gen-ddc-page";
import { NotFoundPage } from "applitutoriel-js-common/src/views/gen/gen-nfe-page";


export class Routes extends AbstractRoutes {
    constructor() {
        super();

        /* Routes des pages */
        this.addPageRoute("/accueil",
            () => new PageRouteInfos(HomePage),
            PUBLIC_ROUTE
        );

        this.addPageRoute("/404",
            () => new PageRouteInfos(NotFoundPage),
            PUBLIC_ROUTE

        );

        this.addPageRoute("/aide",
            () => new PageRouteInfos(AidePage),
            PUBLIC_ROUTE
        );

        this.addPageRoute("/planAppli",
            () => new PageRouteInfos(PlanAppliPage),
            PUBLIC_ROUTE
        );

        this.addPageRoute("/politiqueAccessibilite",
            () => new PageRouteInfos(AccessibilitePage),
            PUBLIC_ROUTE
        );

        this.addPageRoute("/declarationConformite",
            () => new PageRouteInfos(DeclarationconformitePage),
            PUBLIC_ROUTE
        );

        /* Routes lazy */
        this.addLazyRoutes(URL_PARTENAIRES, "par/par-routes");
        this.addLazyRoutes(URL_SECTEURS, "adm/adm-lst-routes");
        this.addLazyRoutes(URL_CONTACT, "cnt/gen-cnt-routes");
        this.addLazyRoutes(URL_PRODUITS, "adm/adm-rps-routes");
        this.addLazyRoutes(URL_REPARTITIONS, "adm/adm-rps-routes");
        this.addLazyRoutes(URL_REF, "ref/ref-routes");

        this.addLazyRoutes("/produits", "pro/pro-routes");
    }
}
