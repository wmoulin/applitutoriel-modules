import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { AdministrationSecteurService } from "applitutoriel-js-common/src/services/page/adm/adm-secteur-service";
import * as secteurs from "applitutoriel-js-common/src/resources/mock/adm/adm-lst-data.json";
import { Promise } from "hornet-js-utils/src/promise-api";
const logger: Logger = Utils.getLogger("applitutoriel.services.page.adm.secteur-service-page-impl");
import { ServicePage } from "hornet-js-core/src/services/service-page";
import { HornetSuperAgent } from 'hornet-js-core/src/services/hornet-superagent';
import { HornetRequest } from 'hornet-js-core/src/services/hornet-superagent-request';
import { Response } from 'superagent';
/**
 * Implementation des services pour les secteurs
 * @class
 * @implements {AdministrationSecteurService}
 * @extends {ServiceApi} 
 */
export class SecteurServicePageMockImpl extends ServicePage implements AdministrationSecteurService {
    
    prefixeAuth: string;

    fetch(request: HornetRequest): Promise<any> {
        throw new Error("Method not implemented.");
    }
    fetchOnStream(request: HornetRequest, pipedStream: NodeJS.WritableStream): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getFetcher(): HornetSuperAgent {
        throw new Error("Method not implemented.");
    }
    getToken(): String {
        throw new Error("Method not implemented.");
    }
    saveToken(response: Response): void {
        throw new Error("Method not implemented.");
    }
    
    protected serviceHost: string;
    protected serviceName: string;
    getServiceHost(): string {
        throw new Error("Method not implemented.");
    }
    setServiceHost(serviceHost: string): void {
        throw new Error("Method not implemented.");
    }
    getServiceName(): string {
        throw new Error("Method not implemented.");
    }
    setServiceName(serviceName: string): void {
        throw new Error("Method not implemented.");
    }
    buildUrl(path: any): string {
        throw new Error("Method not implemented.");
    }

    /**
     * liste tous les secteurs
     * @return Promise
     */
    lister(): Promise<any> {
        logger.trace("SERVICES - lister");
        return Promise.resolve((<any>secteurs).data);
    }

    /**
     * supprime un secteur
     * @param {number} id identifiant du secteur à supprimer
     * @return Promise
     */
    supprimer(id: number): Promise<any> {
        logger.trace("SERVICES - supprimer : ", id);
        return Promise.resolve((<any>secteurs).data);
    }

    /**
     * creer un nouveau secteur
     * @param {object} secteur secteur à créer
     * @return Promise
     */
    creer(secteur: any): Promise<any> {
        logger.trace("SERVICES - creer : ", secteur);
        return Promise.resolve((<any>secteurs).data);
    }

    /**
     * creer un nouveau secteur
     * @param {number} id identifiant du secteur à supprimer
     * @param {object} secteur secteur à modifier
     * @return Promise
     */
    modifier(id: number, secteur: any): Promise<any> {
        logger.trace("SERVICES - modifier : ", id, secteur);
        return Promise.resolve([ 1 ]);
    }
}
