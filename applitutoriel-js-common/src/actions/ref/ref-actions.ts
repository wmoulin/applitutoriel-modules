import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { ReferentielPaysService } from "src/services/page/ref/ref-pays-service";
import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";

const logger: Logger = Utils.getLogger("applitutoriel.actions.ref.ref-actions");

export class ListerPays extends RouteActionService<any, ReferentielPaysService> {
    execute(): Promise<any> {
        return this.getService().listerPays();
    }
}

export class ListerVilles extends RouteActionService<any, ReferentielPaysService> {
    execute(): Promise<any> {
        logger.trace("Action: ListerVilles, appel api villes");
        return this.getService().listerVilles();
    }
}

export class ListerNationalites extends RouteActionService<any, ReferentielPaysService> {
    execute(): Promise<any> {
        let payload: any = {};
        if (this.req.body) {
            payload = this.getPayload();
        }
        return this.getService().rechercherNationalites(payload.nationnalite);
    }
}
