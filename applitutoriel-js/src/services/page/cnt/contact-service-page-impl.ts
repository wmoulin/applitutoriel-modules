import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { ServiceRequest } from "hornet-js-core/src/services/service-request";
import { URL_CONTACT, URL_CONTACT_ENVOYER } from "applitutoriel-js-common/src/utils/urls";
import {ContactService} from "applitutoriel-js-common/src/services/page/cnt/contact-service-page";

const logger: Logger = Utils.getLogger("applitutoriel.services.gen.contact-service-page");

/**
 * Implementation des services pour les contacts
 * @class
 * @implements {ContactService}
 * @extends {ServiceApi}
 */
export class ContactServiceImpl extends ServiceRequest implements ContactService {
    
    /**
     * Envoie d'un message sur contacts
     * @param {object} data message à envoyer
     */
    envoyer(data:any) : Promise<any> {
        logger.trace("SERVICES - send : ", data);

        return this.fetch({
            method : "post",
            url : this.buildUrl(URL_CONTACT + URL_CONTACT_ENVOYER),
            data: data
        });
    }
}
