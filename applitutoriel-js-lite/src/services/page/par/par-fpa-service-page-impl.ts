import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { ServicePage } from "hornet-js-core/src/services/service-page";
import * as _ from "lodash";
import { URL_PAR_PHOTO, URL_PARTENAIRES } from "applitutoriel-js-common/src/utils/urls";
import { ReferentielPaysServiceImpl } from "src/services/page/ref/ref-pays-service-impl";
import { HornetRequest, SpinnerType } from "hornet-js-core/src/services/hornet-superagent-request";
import { FichePartenairePageService } from "applitutoriel-js-common/src/services/page/par/par-fpa-service";
import { URL_SECTEURS } from "applitutoriel-js-common/src/utils/urls";

const logger: Logger = Utils.getLogger("applitutoriel.services.page.par.par-fpa-service-page-impl");

/**
 * Implementation des services pour les partenaires
 * @class
 * @implements {FichePartenaireService}
 * @extends {ServiceApi}
 */
export class FichePartenaireServiceImpl extends ServicePage implements FichePartenairePageService {

    /** service de gestion des pays */
    private paysApi = new ReferentielPaysServiceImpl();

    /**
     * liste tous les secteurs
     * @return Promise
     */
    listerSecteurs(): Promise<any> {
        logger.trace("SERVICES - lister");
        return this.fetch({method: "get", url: this.buildUrl(URL_SECTEURS)});
    }

    /**
     * liste les produit
     * @param {number} id identifiant du partenaire à récupérer
     * @return Promise
     */
    fichePartenaire(id: number): Promise<any> {
        let url: string = URL_PARTENAIRES;
        let p: Promise<any>;
        if (id) {
            url += "/" + id;
        }

        return this.fetch({method: "get", url: this.buildUrl(url)});
    }

    /**
     * Récupère les données nécessaires à l'écran de fiche partenaire
     * @return Promise<object>
     */
    getFormData(): Promise<any> {
        return this.paysApi.listerVilles().then((villes: any) => {
            return this.paysApi.listerPays().then((pays: any) => {
                return Promise.resolve({villes: villes, pays: pays});
            });
        });
    }

    rechercherNationalites(nationalite: string, spinner: SpinnerType = SpinnerType.Default): Promise<any> {
        return this.paysApi.rechercherNationalites(nationalite, spinner);
    }

    /**
     * Création / Modifiaction d'un partenaire existant
     * @param {number} id identifiant du partenaire à modifier
     * @param {object} partenaire partenaire à modifier
     * @param {object} process function à appeler pendant la progress de la request
     * @return Promise<object>
     */
    modifier(id: number, partenaire: any, progress: Function): Promise<any> {

        let request: HornetRequest = {method: "put", url: this.buildUrl(URL_PARTENAIRES) + "/" + id};

        if (!id) {
            request = {method: "post", url: this.buildUrl(URL_PARTENAIRES)};
        }

        if (Utils.isServer) {
            // On est sur NodeJS et on envoi vers le backend, on encode donc la photo en JSON et on POST de manière "classique"
            request.data = this.convertToRemotePartenaire(partenaire);
        } else {
            // On est sur le browser, on va encoder le POST en multipart et transférer le corps en JSON et l"image dans un "part" séparé
            request.data = partenaire;

            if (partenaire.photo && partenaire.photo instanceof File) {
                // mantis 55104
                // L'objet photo est de type "File" seulement
                // quand un fichier est a été uploadé dans le formulaire et transmis dans la requête
                // Si ce n'est pas un fichier, on peut l'ignorer (cela signifie que la photo n'a pas changé)
                // De plus, si on essaye quand même de l'attacher dans la requête alors que ce n'est pas un fichier,
                // firefox plante (Argument 2 of FormData.append does not implement interface Blob)
                request.attach = [];
                request.attach.push({field: "photo", file: partenaire.photo, fileName: partenaire.photo.name});
                request.progress = progress;
            }
        }
        return this.fetch(request);
    }

    /**
     * Récupère la photo associée partenaire
     * @param {number} id identifiant du partenaire dont on souhaite la photo
     * @return Promise<object>
     */
    lirePhoto(id: number, res?: NodeJS.WritableStream): Promise<any> {
        logger.trace("SERVICES - lirePhoto : ", id);
        if (res) {
            return this.fetchOnStream({
                method: "get",
                url: this.buildUrl(URL_PARTENAIRES + "/" + id + URL_PAR_PHOTO)
            }, res);
        }
        return this.fetch({method: "get", url: this.buildUrl(URL_PARTENAIRES + "/" + id + URL_PAR_PHOTO)});
    }

    /**
     * node >v10 does not parse JSON buffer too a buffer so we must detect and create a buffer
     * @param buff
     * @returns {*}
     */
    protected convertBufferToArray(buff: any): any {
        let buffer = buff;
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
        remotePartenaire.satisfaction =
            (_.isArray(webPartenaire.satisfaction)) ? webPartenaire.satisfaction.join(",") : webPartenaire.satisfaction;

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
