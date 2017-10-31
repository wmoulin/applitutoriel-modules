import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as ReferentielAction from "applitutoriel-js-common/src/actions/ref/ref-actions";

import { AbstractRoutes, DataRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import { Roles } from "applitutoriel-js-common/src/utils/roles";

import {
    URL_PAYS,
    URL_REF_NATIONALITE,
    URL_REF_VILLES
} from "applitutoriel-js-common/src/utils/urls";
import { ReferentielPaysServiceImpl } from "src/services/data/ref/ref-pays-service-impl";

const logger: Logger = Utils.getLogger("applitutoriel.routes.ref.ref-routes");

export default class ReferentielRoutesServer extends AbstractRoutes {

    constructor() {

        super();

        this.addDataRoute(URL_REF_VILLES,
            () => new DataRouteInfos(ReferentielAction.ListerVilles, null, ReferentielPaysServiceImpl),
            Roles.ADMIN
        );

        this.addDataRoute(URL_PAYS,
            () => new DataRouteInfos(ReferentielAction.ListerPays, null, ReferentielPaysServiceImpl),
            Roles.ADMIN
        );

        this.addDataRoute(URL_REF_NATIONALITE,
            () => new DataRouteInfos(ReferentielAction.ListerNationalites, null, ReferentielPaysServiceImpl),
            Roles.ADMIN
        );
        
        this.addDataRoute(URL_REF_NATIONALITE + "/recherche",
            () => new DataRouteInfos(ReferentielAction.ListerNationalites, null, ReferentielPaysServiceImpl),
            Roles.ADMIN,
            "post"
        );
    }
}