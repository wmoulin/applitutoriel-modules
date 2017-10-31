import {PageRouteInfos, PUBLIC_ROUTE} from "hornet-js-core/src/routes/abstract-routes";
import {HomePage} from "applitutoriel-js-common/src/views/gen/gen-hom-page";
import {AidePage} from "applitutoriel-js-common/src/views/gen/gen-aid-page";
import {PlanAppliPage} from "applitutoriel-js-common/src/views/nav/nav-pap-page";
import {AccessibilitePage} from "applitutoriel-js-common/src/views/gen/gen-acb-page";
import {DeclarationconformitePage} from "applitutoriel-js-common/src/views/gen/gen-ddc-page";
import {Utils} from "hornet-js-utils";
import {Logger} from "hornet-js-utils/src/logger";
import {
    URL_PARTENAIRES,
    URL_REF,
    URL_SECTEURS,
    URL_PRODUITS,
    URL_REPARTITIONS,
    URL_CONTACT
} from "applitutoriel-js-common/src/utils/urls";
import {AbstractRoutes} from "hornet-js-core/src/routes/abstract-routes";
const logger: Logger = Utils.getLogger("applitutoriel.routes.routes");

export class Routes extends AbstractRoutes {

    constructor() {
        super();
        if(Utils.isServer){
            this.addClientRoutes();
            this.addServerRoutes();
        }else{
            this.addClientRoutes();
        }
    }

    public addClientRoutes(){
        /* Routes des pages */
        this.addPageRoute("/accueil",
            () => new PageRouteInfos(HomePage),
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
        this.addLazyRoutes(URL_SECTEURS, "adm/adm-lst-client-routes");
        this.addLazyRoutes(URL_REPARTITIONS, "adm/adm-rps-client-routes");
        this.addLazyRoutes(URL_PRODUITS, "adm/adm-rps-client-routes");
        this.addLazyRoutes(URL_PARTENAIRES, "par/par-client-routes");
        this.addLazyRoutes(URL_CONTACT, "cnt/gen-cnt-client-routes");
    }

    public addServerRoutes(){
        this.addLazyRoutes(URL_SECTEURS, "adm/adm-lst-server-routes");
        this.addLazyRoutes(URL_REPARTITIONS, "adm/adm-rps-server-routes");
        this.addLazyRoutes(URL_PRODUITS, "adm/adm-rps-server-routes");
        this.addLazyRoutes(URL_PARTENAIRES, "par/par-server-routes");
        this.addLazyRoutes(URL_CONTACT, "cnt/gen-cnt-server-routes");
        this.addLazyRoutes(URL_REF, "ref/ref-server-routes");
    }
}
