import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as RecherchePartenairesAction from "applitutoriel-js-common/src/actions/par/par-rpa-actions";
import * as FichePartenairesAction from "applitutoriel-js-common/src/actions/par/par-fpa-actions";
import { DataRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import { Roles } from "applitutoriel-js-common/src/utils/roles";
import {
    URL_PAR_EXPORTER,
    URL_PAR_EXPORTER_OFD,
    URL_PAR_PHOTO,
    URL_PAR_RECHERCHE,
    URL_PAR_SUPPRESSION_MASSE
} from "applitutoriel-js-common/src/utils/urls";
import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
import PartenairesRoutesClient from "src/routes/par/par-client-routes";

import { Injector } from "hornet-js-core/src/inject/injector";

const logger: Logger = Utils.getLogger("applitutoriel.routes.par.par-routes");

export default class PartenaireRoutesServer extends PartenairesRoutesClient {
    constructor() {
        super();

        this.addDataRoute(URL_PAR_RECHERCHE,
            () => new DataRouteInfos(RecherchePartenairesAction.Rechercher, null, Injector.getRegistered(PartenaireService)),
            Roles.EVERYONE,
            "post"
        );

        this.addDataRoute(URL_PAR_RECHERCHE,
            () => new DataRouteInfos(RecherchePartenairesAction.Rechercher, null, Injector.getRegistered(PartenaireService)),
            Roles.EVERYONE,
        );

        this.addDataRoute("",
            () => new DataRouteInfos(FichePartenairesAction.FichePartenaire, null, Injector.getRegistered(PartenaireService))
        );

        this.addDataRoute(URL_PAR_EXPORTER,
            () => new DataRouteInfos(RecherchePartenairesAction.ExportLite, null, Injector.getRegistered(PartenaireService)),
            Roles.EVERYONE,
            "post"
        );

        this.addDataRoute(URL_PAR_EXPORTER_OFD,
            () => new DataRouteInfos(RecherchePartenairesAction.ExportLite, null, Injector.getRegistered(PartenaireService)),
            Roles.EVERYONE,
            "post"
        );

        this.addDataRoute("/(\\d+)",
            (id) => new DataRouteInfos(FichePartenairesAction.FichePartenaire, {id: id}, Injector.getRegistered(PartenaireService))
        );


        this.addDataRoute("/(\\d+)",
            (id) => new DataRouteInfos(FichePartenairesAction.EcrirePartenaire, {id: id}, Injector.getRegistered(PartenaireService)),
            "put"
        );

        this.addDataRoute(URL_PAR_SUPPRESSION_MASSE,
            (id) => new DataRouteInfos(RecherchePartenairesAction.SupprimerEnMasse, null, Injector.getRegistered(PartenaireService)),
            Roles.ADMIN,
            "post"
        );

        this.addDataRoute("",
            () => new DataRouteInfos(FichePartenairesAction.EcrirePartenaire, null, Injector.getRegistered(PartenaireService)),
            Roles.ADMIN,
            "post"
        );

        this.addDataRoute("/(\\d+)",
            (id) => new DataRouteInfos(RecherchePartenairesAction.SupprimerPartenaire, {id: id}, Injector.getRegistered(PartenaireService)),
            Roles.ADMIN,
            "delete"
        );


        this.addDataRoute("/(\\d+)" + URL_PAR_PHOTO,
            (idPartenaire) => new DataRouteInfos(FichePartenairesAction.LirePhoto, {idPartenaire: idPartenaire}, Injector.getRegistered(PartenaireService)),
            Roles.EVERYONE
        );


    }
}