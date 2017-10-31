import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { ServicePage } from "hornet-js-core/src/services/service-page";

const logger: Logger = Utils.getLogger("applitutoriel.services.page.adm.applitutoriel-secteurs-service-impl");

/**
 * Exemple de surcharge de la classe ServiceApi fournie par le framework
 * afin de changer l'adresse du serveur tomcat pour gerer le multi service
 */
export class ApplitutorielSecteursServiceImpl extends ServicePage {

    /**
     * Le service par défaut est configuré dans default.json (partie services)
     * Mais il est possible d'en configurer d'autres (configuration "multi-services")
     * Exemple :
     * Si le service des secteurs est déployé sur un autre serveur que celui par défaut
     * alors on redéfinit les variables serviceHost et serviceName pour mettre l'adresse
     * du service spécifique des secteurs (secteursServices.host dans default.json)
     */
    constructor() {
        super();
        // coté client, mode fullSpa (requêtes depuis le browser/client js vers le serveur tomcat),
        // on redéfinit aussi l'adresse du service
        let fullSpa: boolean = Utils.config.getOrDefault("fullSpa.enabled", false);
        if (fullSpa) {
            super.setServiceHost(Utils.config.getOrDefault("fullSpa.secteurs.host", ""));
            super.setServiceName(Utils.buildContextPath(Utils.config.getOrDefault("fullSpa.secteurs.name", "/services")));
            logger.trace("Redefinition de l'adresse des services pour les secteurs : ", super.getServiceHost(), super.getServiceName());
        } else {
            // sinon (requêtes depuis le browser/client js vers le serveur nodejs)
            // on garde l'adresse du serveur node
        }
    }
}