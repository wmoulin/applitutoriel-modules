import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";

import { AbstractRoutes, PageRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import { Roles } from "applitutoriel-js-common/src/utils/roles";
import { RecherchePartenairesPage } from "applitutoriel-js-common/src/views/par/par-rpa-page";
import { FichePartenairePage, PAR_MODE_CREER } from "applitutoriel-js-common/src/views/par/par-fpa/fiche-partenaire-page";
import {
    URL_PAR_CREER,
    URL_PAR_RECHERCHER
} from "applitutoriel-js-common/src/utils/urls";

import { Injector } from "hornet-js-core/src/inject/injector";
import { FichePartenairePageService } from "applitutoriel-js-common/src/services/page/par/par-fpa-service";
import { RecherchePartenaireService } from "applitutoriel-js-common/src/services/page/par/par-rpa-service";

const logger: Logger = Utils.getLogger("applitutoriel.routes.par.par-routes");

export default class PartenairesRoutesClient extends AbstractRoutes {
    constructor() {
        super();

        this.addPageRoute("/(\\w+)/(\\d+)",
            (mode, id) => new PageRouteInfos(FichePartenairePage, {mode: mode, id:id}, Injector.getRegistered(FichePartenairePageService)),
            Roles.ADMIN
        );

        /* Routes des pages */
        /* Nouvelle page de recherche avec critères par défaut */
        this.addPageRoute("/",
            () => new PageRouteInfos(RecherchePartenairesPage, {reset: true}, Injector.getRegistered(RecherchePartenaireService)),
            Roles.EVERYONE
        );

        /* Page de recherche avec critères en session */
        this.addPageRoute(URL_PAR_RECHERCHER,
            () => new PageRouteInfos(RecherchePartenairesPage, {reset: false}, Injector.getRegistered(RecherchePartenaireService)),
            Roles.EVERYONE
        );

        /* Page de création de partenaire */
        this.addPageRoute(URL_PAR_CREER,
            () => new PageRouteInfos(FichePartenairePage, {mode: PAR_MODE_CREER}, Injector.getRegistered(FichePartenairePageService)),
            Roles.ADMIN
        );
    }
}
