import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { ServiceSecure } from "hornet-js-core/src/services/service-secure";
import { PartenaireMetier } from "applitutoriel-js-common/src/models/par/par-mod";
import { Response } from "superagent";

const logger: Logger = Utils.getLogger("applitutoriel-js-common.services.data.par.par-fiche-partenaire-service");

/**
 * Implémentation des services pour les partenaires
 * @class
 * @implements {FichePartenaireService, IService}
 */
export abstract class FichePartenaireService extends ServiceSecure {

    /**
     * Récupère les données liés au partenaires
     * @param id du partenaire
     * @return Promise<object>
     */
    abstract fichePartenaire(id: number): Promise<any> ;

    /**
     * Récupère les données nécessaires pour l'affichage du partenaire
     * @return Promise<object>
     */
    abstract getFormData(): Promise<any>;

    /**
     * Récupère les données nécessaires pour l'affichage du partenaire
     * @return Promise<object>
     * @ignore
     */
    abstract charger(id: any): Promise<any>;

    /**
     * Récupère les données des nationalités en fonction des caractères saisis
     * @return Promise<object>
     */
    abstract rechercherNationalites(nationalite: string): Promise<any>;

    /**
     * Modifie ou crée un partenaire en base
     * @return Promise<object>
     */
    abstract modifier(id: any, partenaire: any): Promise<any>;

    /**
     * Récupère la photo du partenaire
     * @return Promise<object>
     */
    abstract lirePhoto(idPartenaire: any): Promise<any>;

    /**
     * Insère la photo du partenaire s'il celle-ci existe.
     * @return Promise<object>
     */
    abstract insertPhoto(partenaire: PartenaireMetier): Promise<any>;

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
