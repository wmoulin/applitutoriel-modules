import { Roles } from "applitutoriel-js-common/src/utils/roles";
import { AbstractRoutes, PageRouteInfos, DataRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import { AdministrationSecteurService } from "applitutoriel-js-common/src/services/page/adm/adm-secteur-service";
import { SecteursPage } from "applitutoriel-js-common/src/views/adm/adm-lst-page";
import { SecteurServiceImpl } from "src/services/page/adm/secteur-service-page-impl";
import { Injector } from "hornet-js-core/src/inject/injector";

export default class SecteursRoutesClient extends AbstractRoutes {
    constructor() {
        super();

        /* Route des pages*/
        this.addPageRoute("/",
            () => new PageRouteInfos(SecteursPage, null, Injector.getRegistered(AdministrationSecteurService)),
            Roles.ADMIN
        );
    }
}
