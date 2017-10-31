import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as _ from "lodash";
import { URL_PAR_PHOTO, URL_PARTENAIRES } from "applitutoriel-js-common/src/utils/urls";
import { HornetRequest, SpinnerType } from "hornet-js-core/src/services/hornet-superagent-request";
import { FichePartenairePageService } from "applitutoriel-js-common/src/services/page/par/par-fpa-service";
import { Promise } from "hornet-js-utils/src/promise-api";
import { ReferentielPaysServicePageMockImpl } from "applitutoriel-js-common/src/mock/services/page/ref/ref-pays-service-page-mock-impl";
import { PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";
import * as secteurs from "applitutoriel-js-common/src/resources/mock/adm/adm-lst-data.json";
import * as tableauDePartenaires1 from "applitutoriel-js-common/src/resources/mock/par/par-rpa-data-1.json";
import * as tableauDePartenaires2 from "applitutoriel-js-common/src/resources/mock/par/par-rpa-data-2.json";
import * as tableauDePartenaires3 from "applitutoriel-js-common/src/resources/mock/par/par-rpa-data-3.json";
import * as tableauDePartenaires4 from "applitutoriel-js-common/src/resources/mock/par/par-rpa-data-4.json";
import * as villes from "applitutoriel-js-common/src/resources/mock/par/par-rpa-villes.json";
import * as pays from "applitutoriel-js-common/src/resources/mock/par/par-pays-data.json";
import { ReferentielPaysService } from "src/services/data/ref/ref-pays-service";

const logger: Logger = Utils.getLogger("applitutoriel-js-common.mock.services.data.par.fiche-partenaire-service-mock-impl");

/**
 * Implementation des services pour les partenaires 
 * @class
 * @implements {FichePartenaireService}
 * @extends {ServiceApi}
 */

export class FichePartenaireServicePageMockImpl extends FichePartenairePageService {

    /** service de gestion des pays */
    private paysService: ReferentielPaysServicePageMockImpl = new ReferentielPaysServicePageMockImpl();

    /**
     * liste les produit
     * @param {number} id identifiant du partenaire à récupérer
     * @return Promise
     */
    fichePartenaire(id: number): Promise<any> {
        let idPartenaire: number = parseInt((<any>id), 10);
        let result = [];
        result = result.concat((<any>tableauDePartenaires1).data.liste);
        result = result.concat((<any>tableauDePartenaires2).data.liste);
        result = result.concat((<any>tableauDePartenaires3).data.liste);
        result = result.concat((<any>tableauDePartenaires4).data.liste);
        logger.debug("Recupèrer le partenaire bouchonné qui à l\"id:", idPartenaire);
        let partenaire: PartenaireResult = _.find(result, (item: PartenaireResult) => {
            logger.debug(item);
            if (item.id === idPartenaire) {
                return true;
            }
        });

        partenaire[ "ZMOCK" ] = true;

        return Promise.resolve({ villes: villes[ "data" ], pays: pays[ "data" ], partenaire: partenaire });

    }

    /**
     * Récupère les données nécessaires à l'écran de fiche partenaire
     * @return Promise<object>
     */
    getFormData(): Promise<any> {
        return this.paysService.listerVilles().then((villes: any) => {
            return this.paysService.listerPays().then((pays: any) => {
                return Promise.resolve({ villes: villes, pays: pays });
            });
        });
    }

    rechercherNationalites(nationalite: string = "", spinner: SpinnerType = SpinnerType.Default): Promise<any> {
        return this.paysService.rechercherNationalites(nationalite);
    }

    /**
     * liste tous les secteurs
     * @return Promise
     */
    listerSecteurs(): Promise<any> {
        logger.trace("SERVICES - lister");
        return Promise.resolve((<any>secteurs).data);
    }

    /**
     * Cration / Modifiaction d'un partenaire existant
     * @param {number} id identifiant du partenaire à modifier
     * @param {object} partenaire partenaire à modifier
     * @return Promise<object>
     */
    modifier(id: number, partenaire: any): Promise<any> {
        let idPartenaire: number = parseInt((<any>id), 10);
        let result = [];
        result = result.concat((<any>tableauDePartenaires1).data.liste);
        result = result.concat((<any>tableauDePartenaires2).data.liste);
        result = result.concat((<any>tableauDePartenaires3).data.liste);
        result = result.concat((<any>tableauDePartenaires4).data.liste);
        logger.debug("Recupèrer le partenaire bouchonné qui à l\"id:", idPartenaire);
        let rpartenaire: PartenaireResult = _.find(result, (item: PartenaireResult) => {
            logger.debug(item);
            if (item.id === idPartenaire) {
                return true;
            }
        });

        partenaire[ "ZMOCK" ] = true;
        return Promise.resolve({ villes: villes[ "data" ], pays: pays[ "data" ], partenaire: rpartenaire });
    }

    /**
     * Récupère la photo associée partenaire
     * @param {number} id identifiant du partenaire dont on souhaite la photo
     * @return Promise<object>
     */
    lirePhoto(id: number, res?: NodeJS.WritableStream): Promise<any> {
        logger.trace("SERVICES - lirePhoto : ", id);
        let request: HornetRequest = { method: "get", url: this.buildUrl(URL_PARTENAIRES + "/" + id + URL_PAR_PHOTO) };
        return (res) ? this.fetchOnStream(request, res) : this.fetch(request);
    }

    /**
     * node >v10 does not parse JSON buffer too a buffer so we must detect and create a buffer
     * @param buff
     * @returns {*}
     */
    protected convertBufferToArray(buff: any): any {
        var buffer = buff;
        if (buff !== undefined && Buffer.isBuffer(buff)) {
            buffer = new Buffer(buff).toJSON();
        }
        return buffer;
    }

    /**
     * convertion d'un partenaire
     * @param {object} webPartenaire
     * @returns {object}
     */
    protected convertToRemotePartenaire(webPartenaire: any): any {

        let remotePartenaire: any = _.assign({}, webPartenaire);
        remotePartenaire.satisfaction = (_.isArray(webPartenaire.satisfaction.ids)) ? webPartenaire.satisfaction.ids.join(",") : "";

        if (remotePartenaire.photo && remotePartenaire.photo.contenu) {
            let photo: any = remotePartenaire.photo;
            let buffer = this.convertBufferToArray(photo.contenu);
            remotePartenaire.photo = {
                id: null,
                nom: photo.originalname,
                originalname: photo.originalname,
                name: photo.originalname,
                mimeType: photo.mimeType,
                encoding: photo.encoding,
                size: photo.size,
                data: buffer.data
            };
            photo = null;
        }
        return remotePartenaire;
    }

}