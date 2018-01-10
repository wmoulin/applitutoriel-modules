import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
import { AdministrationSecteurServiceData } from "src/services/data/adm/adm-secteur-service-data";

const logger: Logger = Utils.getLogger("applitutoriel.actions.adm.adm-lst-actions");

export class ListerSecteurs extends RouteActionService<any, AdministrationSecteurServiceData> {
    execute(): Promise<any> {
        logger.trace("ACTION ListerSecteurs - Appel API : SecteurApi.lister - Dispatch SECTEUR_RECEIVE_LIST");
        return this.getService().lister();
    }
}

export class SupprimerSecteur extends RouteActionService<{ id: number }, AdministrationSecteurServiceData> {
    execute(): Promise<any> {
        logger.trace("ACTION SupprimerSecteur - Appel API : SecteurApi.supprimer - Dispatch SECTEUR_DELETED");
        return this.getService().supprimer(this.attributes.id);
    }
}

export class ModifierSecteur extends RouteActionService<{ id: number }, AdministrationSecteurServiceData> {
    execute(): Promise<any> {
        logger.trace("ACTION ModifierSecteur - Appel API : SecteurApi.modifier - Dispatch SECTEUR_UPDATED");
        return this.getService().modifier(this.attributes.id, this.req.body);
    }
}

export class CreerSecteur extends RouteActionService<any, AdministrationSecteurServiceData> {
    execute(): Promise<any> {
        logger.trace("ACTION CreerSecteur - Appel API : SecteurApi.creer - Dispatch SECTEUR_CREATED");
        return this.getService().creer(this.req.body);
    }
}
