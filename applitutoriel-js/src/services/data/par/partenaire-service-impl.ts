import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { MediaType } from "hornet-js-core/src/protocol/media-type";
import {
    URL_PAR_EXPORTER,
    URL_PAR_PHOTO,
    URL_PAR_RECHERCHE,
    URL_PAR_SUPPRESSION_MASSE,
    URL_PARTENAIRES,
    URL_SECTEURS
} from "applitutoriel-js-common/src/utils/urls";
import { PartenaireRechercheParameter } from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
import { PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";
import { HornetRequest } from "hornet-js-core/src/services/hornet-superagent-request";
import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
import { ReferentielPaysServiceImpl } from "src/services/data/ref/ref-pays-service-impl";

import * as _ from "lodash";

const logger: Logger = Utils.getLogger("applitutoriel-js-hornet.services.data.par.partenaire-service-impl");

/**
 * Implementation des services pour les partenaires
 * @class
 * @implements {RecherchePartenaireService}
 * @extends {ServiceApi}
 */
export class PartenaireServiceImpl extends PartenaireService {


    /** service de gestion des pays */
    private paysApi = new ReferentielPaysServiceImpl();

    /**
     * liste les produits
     * @return Promise
     */
    rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any> {
        logger.trace("SERVICES - rechercher : ", criteres, reqMimeType);
        let request: HornetRequest = {
            url: this.buildUrl(URL_PARTENAIRES + URL_PAR_RECHERCHE),
            method: "post",
            data: criteres,
            typeMime: reqMimeType
        };
        return (res) ? this.fetchOnStream(request, res) : this.fetch(request);

    }

    supprimer(id): Promise<any> {
        logger.trace("SERVICES - supprimer : ", id);
        return this.fetch({method: "delete", url: this.buildUrl(URL_PARTENAIRES + "/" + id)});
    }


    supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any> {
        logger.trace("SERVICES - supprimerEnMasse :", partenaires);

        logger.debug("Envoi d'une liste de partenaires à supprimer :", partenaires);

        return this.fetch({
            method: "post",
            url: this.buildUrl(URL_PARTENAIRES + URL_PAR_SUPPRESSION_MASSE),
            data: partenaires
        });
    }


    exporter(reqMimeType: MediaType): Promise<any> {
        logger.trace("SERVICES - exporter : ", reqMimeType);
        return this.fetch({
            method: "post",
            url: this.buildUrl(URL_PARTENAIRES + URL_PAR_EXPORTER),
            typeMime: reqMimeType
        });
    }

    exporterODF(reqMimeType: MediaType): Promise<any> {
        logger.trace("SERVICES - exporterODF : ", reqMimeType);
        return Promise.resolve(true);
    }

    /**
     * Cration / Modifiaction d'un partenaire existant
     * @param {number} id identifiant du partenaire à modifier
     * @param {object} partenaire partenaire à modifier
     * @return Promise<object>
     */
    modifier(id: number, partenaire: any): Promise<any> {

        let request: HornetRequest = {method: "put", url: this.buildUrl(URL_PARTENAIRES) + "/" + id}

        if (!id) {
            request = {method: "post", url: this.buildUrl(URL_PARTENAIRES)}
        }

        if (Utils.isServer) {
            // On est sur NodeJS et on envoi vers le backend, on encode donc la photo en JSON et on POST de manière "classique"
            request.data = this.convertToRemotePartenaire(partenaire);
        } else {
            // On est sur le browser, on va encoder le POST en multipart et transférer le corps en JSON et l"image dans un "part" séparé
            //request.send({"content" : JSON.stringify(partenaire)});
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
            }
        }
        return this.fetch(request);
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

    /**
     * liste tous les secteurs
     * @return Promise
     */
    listerSecteurs() : Promise<any> {
        logger.trace("SERVICES - lister");
        return this.fetch({method : "get", url : this.buildUrl(URL_SECTEURS)});
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
     * Pour optimiser le nombre de requêtes, mise en place d'un méthode "chapeau" permettant d'agréger l'appel de plusieurs services
     * @return Promise<object>
     */
    getFormData(): Promise<any> {
        return this.paysApi.listerVilles().then((villes: any) => {
            return this.paysApi.listerPays().then((pays: any) => {
                return Promise.resolve({villes: villes, pays: pays});
            });
        });
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
}
