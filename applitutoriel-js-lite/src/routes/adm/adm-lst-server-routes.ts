import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { Roles } from "applitutoriel-js-common/src/utils/roles";
import { DataRouteInfos, PUBLIC_ROUTE } from "hornet-js-core/src/routes/abstract-routes";
import {
    CreerSecteur,
    ListerSecteurs,
    ModifierSecteur,
    SupprimerSecteur
} from "applitutoriel-js-common/src/actions/adm/adm-lst-actions";


import { AdministrationSecteurServiceData } from "applitutoriel-js-common/src/services/data/adm/adm-secteur-service-data";
import SecteursRoutesClient from "src/routes/adm/adm-lst-client-routes";

import { Injector } from "hornet-js-core/src/inject/injector";

const logger: Logger = Utils.getLogger("src/routes/routes");

export default class SecteursRoutesServer extends SecteursRoutesClient {

    constructor() {
        super();
        /* Route des data*/
        this.addDataRoute("/",
            () => new DataRouteInfos(ListerSecteurs, null, Injector.getRegistered(AdministrationSecteurServiceData))
        );

        this.addDataRoute("/(\\d+)",
            (id) => new DataRouteInfos(ModifierSecteur,  {id: id}, Injector.getRegistered(AdministrationSecteurServiceData)),
            Roles.ADMIN,
            "put"
        );

        this.addDataRoute("/",
            (id) => new DataRouteInfos(CreerSecteur, null, Injector.getRegistered(AdministrationSecteurServiceData)),
            Roles.ADMIN,
            "post"
        );

        this.addDataRoute("/(\\d+)",
            (id) => new DataRouteInfos(SupprimerSecteur, {id: id}, Injector.getRegistered(AdministrationSecteurServiceData)),
            Roles.ADMIN,
            "delete"
        );
    }
}

