import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as ReferentielAction from "applitutoriel-js-common/src/actions/ref/ref-actions";
import { AbstractRoutes, DataRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import { Roles } from "applitutoriel-js-common/src/utils/roles";

import {
    URL_PAYS,
    URL_REF_VILLES,
    URL_REF_NATIONALITE
} from "applitutoriel-js-common/src/utils/urls";

import { ReferentielPaysService } from "applitutoriel-js-common/src/services/data/ref/ref-pays-service";
import { Injector } from "hornet-js-core/src/inject/injector";

const logger: Logger = Utils.getLogger("applitutoriel.src.routes.ref.ref-routes");

export default class ReferentielRoutes extends AbstractRoutes {

    constructor() {
        super();

        this.addDataRoute(URL_REF_VILLES,
            () => new DataRouteInfos(ReferentielAction.ListerVilles, null, Injector.getRegistered(ReferentielPaysService)),
            Roles.EVERYONE
        );

        this.addDataRoute(URL_PAYS,
            () => new DataRouteInfos(ReferentielAction.ListerPays, null, Injector.getRegistered(ReferentielPaysService)),
            Roles.EVERYONE
        );

        this.addDataRoute(URL_REF_NATIONALITE,
            () => new DataRouteInfos(ReferentielAction.ListerNationalites, null, Injector.getRegistered(ReferentielPaysService)),
            Roles.EVERYONE
        );
        
        this.addDataRoute(URL_REF_NATIONALITE + "/recherche",
            (nationnalite) => new DataRouteInfos(ReferentielAction.ListerNationalites, null, Injector.getRegistered(ReferentielPaysService)),
            Roles.ADMIN,
            "post"
        );
    }
}