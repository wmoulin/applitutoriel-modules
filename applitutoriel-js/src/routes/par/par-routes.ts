import * as RecherchePartenairesAction from "applitutoriel-js-common/src/actions/par/par-rpa-actions";
import { AbstractRoutes, DataRouteInfos, PageRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import { Roles } from "applitutoriel-js-common/src/utils/roles";
import { RecherchePartenairesPage } from "applitutoriel-js-common/src/views/par/par-rpa-page";
import {
    FichePartenairePage,
    PAR_MODE_CREER
} from "applitutoriel-js-common/src/views/par/par-fpa/fiche-partenaire-page";

import {
    URL_PAR_CREER,
    URL_PAR_EXPORTER,
    URL_PAR_EXPORTER_OFD,
    URL_PAR_PHOTO,
    URL_PAR_SUPPRESSION_MASSE,
    URL_RECHERCHE
} from "applitutoriel-js-common/src/utils/urls";

import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
import { FichePartenaireService } from "applitutoriel-js-common/src/services/data/par/fiche-partenaire-service";

import { RecherchePartenaireServiceImpl } from "src/services/page/par/par-rpa-service-impl";
import { FichePartenaireServiceImpl } from "src/services/page/par/par-fpa-service-impl";

import { Injector } from "hornet-js-core/src/inject/injector";
import { FichePartenaire, EcrirePartenaire, LirePhoto } from "applitutoriel-js-common/src/actions/par/par-fpa-actions";

export default class PartenairesRoutes extends AbstractRoutes {
    constructor() {
        super();

        this.addPageRoute("/(\\w+)/(\\d+)",
            (mode, id) => new PageRouteInfos(FichePartenairePage, {mode: mode, id: id}, FichePartenaireServiceImpl),
            Roles.EVERYONE
        );

        /* Routes des pages */

        /* Nouvelle page de recherche avec critères par défaut */
        this.addPageRoute("/",
            () => new PageRouteInfos(RecherchePartenairesPage, {}, RecherchePartenaireServiceImpl),
            Roles.EVERYONE
        );

        /* Page de création de partenaire*/
        this.addPageRoute(URL_PAR_CREER,
            () => new PageRouteInfos(FichePartenairePage, {mode: PAR_MODE_CREER}, FichePartenaireServiceImpl),
            Roles.ADMIN
        );

        /* Route des datas */
        this.addDataRoute(URL_RECHERCHE,
            () => new DataRouteInfos(RecherchePartenairesAction.Rechercher, null, Injector.getRegistered(PartenaireService)),
            Roles.EVERYONE,
            "post"
        );

        this.addDataRoute(URL_PAR_EXPORTER,
            () => new DataRouteInfos(RecherchePartenairesAction.Export, {}, Injector.getRegistered(PartenaireService)),
            Roles.EVERYONE,
            "post"
        );

        this.addDataRoute(URL_PAR_EXPORTER_OFD,
            () => new DataRouteInfos(RecherchePartenairesAction.ExportLite, null, Injector.getRegistered(PartenaireService)),
            Roles.EVERYONE,
            "post"
        );

        this.addDataRoute("/(\\d+)",
            (id) => new DataRouteInfos(FichePartenaire, {id: id}, Injector.getRegistered(PartenaireService)),
            Roles.EVERYONE
        );

        this.addDataRoute("",
            () => new DataRouteInfos(EcrirePartenaire, {}, Injector.getRegistered(PartenaireService)),
            "post"
        );

        this.addDataRoute("/(\\d+)",
            (id) => new DataRouteInfos(EcrirePartenaire, {id: id}, Injector.getRegistered(PartenaireService)),
            Roles.ADMIN,
            "put"
        );

        this.addDataRoute("/(\\d+)",
            (id) => new DataRouteInfos(RecherchePartenairesAction.SupprimerPartenaire, {id: id}, Injector.getRegistered(PartenaireService)),
            Roles.ADMIN,
            "delete"
        );

        this.addDataRoute(URL_PAR_SUPPRESSION_MASSE,
            (id) => new DataRouteInfos(RecherchePartenairesAction.SupprimerEnMasse, null, Injector.getRegistered(PartenaireService)),
            Roles.ADMIN,
            "post"
        );

        this.addDataRoute("/(\\d+)" + URL_PAR_PHOTO,
            (id) => new DataRouteInfos(LirePhoto, {idPartenaire: id}, Injector.getRegistered(FichePartenaireService)),
            Roles.EVERYONE
        );
    }
}
