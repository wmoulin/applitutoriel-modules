import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { HornetSuperAgent, HornetPluginConfig } from "hornet-js-core/src/services/hornet-superagent";
import { UserInformations } from "hornet-js-utils/src/authentication-utils";
import * as superAgentPlugins from "hornet-js-core/src/services/superagent-hornet-plugins";

const logger: Logger = Utils.getLogger("applitutoriel-js.services.applitutoriel.applitutoriel-agent");

/**
 * Exemple de surcharge de la classe HornetAgent fournie par le framework afin d'ajouter les roles de l'utilisateur
 */
export class ApplitutorielAgent extends HornetSuperAgent {

    private currentUser: UserInformations;

    constructor(user?: UserInformations) {
        super();
        this.currentUser = user;
        let roles: string = (this.currentUser) ? JSON.stringify(this.currentUser.roles) : "";
        logger.trace("Roles ajoutés à la requête : ", roles);

        this.plugins.addBefore(new HornetPluginConfig("applitutoRoles", superAgentPlugins.AddParam, ["role", roles]), this.plugins[0]);
    }
}