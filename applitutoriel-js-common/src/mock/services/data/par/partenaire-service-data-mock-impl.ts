import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { MediaType } from "hornet-js-core/src/protocol/media-type";
import { PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";
import { PartenaireRechercheParameter } from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
import { NotFoundError } from "hornet-js-utils/src/exception/not-found-error";
import { Promise } from "hornet-js-utils/src/promise-api";
import * as _ from "lodash";

import * as tableauDePartenaires from "applitutoriel-js-common/src/resources/mock/par/par-rpa-data.json";
import * as villes from "applitutoriel-js-common/src/resources/mock/par/par-rpa-villes.json";
import * as pays from "applitutoriel-js-common/src/resources/mock/par/par-pays-data.json";

const logger: Logger = Utils.getLogger("applitutoriel-js-common.mock.services.data.par.partenaire-service-data-mock-impl");

/**
 * Implementation des services pour les partenaires
 * @class
 * @implements {RecherchePartenaireService}
 * @extends {ServiceApi}
 */
export class PartenaireServiceDataMockImpl extends PartenaireService {
    /**
     * liste les produits
     * @return Promise
     */
    rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any> {
        logger.debug("MOCK- recherche de partenaire", criteres);
        return Promise.resolve((<any> tableauDePartenaires).data);
    }

    supprimer(id): Promise<any> {
        return Promise.resolve(() => {
            logger.debug("MOCK - Suppression du partenaire, id:", id);
            _.remove((<any> tableauDePartenaires).data, function(item: any) {
                if (item.id === id) {
                    return true;
                }
            });
        });

    }

    supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any> {
        return Promise.resolve();
    }

    //todo: à supprimer ?
    exporter(reqMimeType: MediaType): Promise<any> {
        return Promise.resolve();
    }

    exporterODF(reqMimeType: MediaType): Promise<any> {
        return Promise.resolve();
    }

    /**
     * Cration / Modifiaction d'un partenaire existant
     * @param {number} id identifiant du partenaire à modifier
     * @param {object} partenaire partenaire à modifier
     * @return Promise<object>
     */
    modifier(id: number, partenaire: any): Promise<any> {
        return Promise.resolve();
    }

    /**
     * Récupère la photo associée partenaire
     * @param {number} id identifiant du partenaire dont on souhaite la photo
     * @return Promise<object>
     */
    lirePhoto(idPartenaire: number): Promise<any> {
        return Promise.resolve();
    }

    /**
     *
     * @param idPartenaire
     */
    fichePartenaire(id: number): Promise<any> {

        let idPartenaire: number = parseInt(<any>id, 10);
        logger.debug("MOCK - Recupèrer le partenaire bouchonné qui à l\"id:", idPartenaire);
        let partenaire: PartenaireResult = _.find((<any> tableauDePartenaires).data.liste, (item: PartenaireResult) => {
            logger.debug(item);
            if (item.id === idPartenaire) {
                return true;
            }
        });

        if (partenaire) {
            return Promise.resolve(partenaire);
        } else {
            throw new NotFoundError({errorMessage: "partenaire non trouvé"});
        }
    }

    getFormData(): Promise<any> {
        return Promise.resolve({villes: (<any> villes).data, pays: (<any> pays).data});
    }
}
