import { AbstractRoutes, PageRouteInfos, DataRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import {
    ListerSecteurs,
    ModifierSecteur,
    SupprimerSecteur,
    CreerSecteur
} from "applitutoriel-js-common/src/actions/adm/adm-lst-actions";
import { SecteursPage } from "applitutoriel-js-common/src/views/adm/adm-lst-page";
import { Roles } from "applitutoriel-js-common/src/utils/roles";
import { SecteurServiceImpl } from "src/services/page/sec/secteur-service-page-impl";
import { AdministrationSecteurService } from "applitutoriel-js-common/src/services/page/adm/adm-secteur-service";
import { AdministrationSecteurServiceData } from "applitutoriel-js-common/src/services/data/adm/adm-secteur-service-data";
import { Injector } from "hornet-js-core/src/inject/injector";

export default class SecteursRoutes extends AbstractRoutes {
    constructor() {
        super();

        /* Route des pages */
        this.addPageRoute("/",
            () => new PageRouteInfos(SecteursPage, null, Injector.getRegistered(AdministrationSecteurService)),
            Roles.ADMIN
        );
        this.addDataRoute("/",
            () => new DataRouteInfos(ListerSecteurs, null, Injector.getRegistered(AdministrationSecteurServiceData))
        );
        /* Route des datas */

        this.addDataRoute("/(\\d+)",
            (id) => new DataRouteInfos(ModifierSecteur, {id: id}, Injector.getRegistered(AdministrationSecteurServiceData)),
            Roles.ADMIN,
            "put"
        );

        this.addDataRoute("/(\\d+)",
            (id) => new DataRouteInfos(SupprimerSecteur, {id: id}, Injector.getRegistered(AdministrationSecteurServiceData)),
            Roles.ADMIN,
            "delete"
        );

        this.addDataRoute("/",
            (id) => new DataRouteInfos(CreerSecteur, null, Injector.getRegistered(AdministrationSecteurServiceData)),
            Roles.ADMIN,
            "post"
        );
    }
}
