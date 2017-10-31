import { Utils } from "hornet-js-utils";
import { MediaType } from "hornet-js-core/src/protocol/media-type";
import { PartenaireRechercheParameter } from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
import { PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";
import { ServiceSecure } from "hornet-js-core/src/services/service-secure";
import { Response } from "superagent";

export abstract class PartenaireService extends ServiceSecure {

    /**
     * liste les produits
     * @return Promise
     */
    abstract rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any>;

    abstract supprimer(id): Promise<any>;

    abstract supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any>;

    //todo: à supprimer ?
    abstract exporter(reqMimeType: MediaType): Promise<any>;

    abstract exporterODF(reqMimeType: MediaType): Promise<any>;

    /**
     * Creation / Modifiaction d'un partenaire existant
     * @param {number} id identifiant du partenaire à modifier
     * @param {object} partenaire partenaire à modifier
     * @return Promise<object>
     */
    abstract modifier(id: number, partenaire: any): Promise<any>;

    abstract fichePartenaire(id: number): Promise<any>;

    abstract getFormData(): Promise<any>;

    saveToken(response: Response): void {

    }

    getToken(): String {
        // Ajout du token à l'envoi
        if (Utils.getContinuationStorage().get("hornet.request") &&
            Utils.getContinuationStorage().get("hornet.request").getSession() &&
            Utils.getContinuationStorage().get("hornet.request").getSession().authorizationToken) {
            return Utils.getContinuationStorage().get("hornet.request").getSession().authorizationToken;
        }
    }
}
