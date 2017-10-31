import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";

import { RouteAction } from "hornet-js-core/src/routes/abstract-routes";
import { DataValidator } from "hornet-js-core/src/validation/data-validator";
import * as _ from "lodash";
import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
import { PhotoMetier } from "src/models/photo-mod";
import { ResultFile } from "hornet-js-core/src/result/result-file";
import { MediaTypes } from "hornet-js-core/src/protocol/media-type";
import { FichePartenaireService } from "applitutoriel-js-common/src/services/data/par/fiche-partenaire-service";
import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";

const logger: Logger = Utils.getLogger("applitutoriel.actions.par.par-fpa-actions");
import * as parValidationSchema from "src/views/par/par-fpa/validation.json";

/**
 * Charge les données nécessaires à l'écran de fiche partenaire
 */
export class FichePartenaire extends RouteActionService<{ id: number }, PartenaireService> {
    execute(): Promise<any> {
        logger.trace("ACTION FichePartenaire");
        let promisefiche = this.getService().fichePartenaire(this.attributes.id);
        return Promise.all([this.getService().getFormData(), promisefiche])
        .then((results: any[]) => {
            return ({
                villes: results[0].villes,
                pays: results[0].pays,
                partenaire: results[1]
            });
        });
    }
}

export class LirePhoto extends RouteActionService<{ idPartenaire: number }, FichePartenaireService> {

    execute(): Promise<ResultFile> {
        return this.getService().lirePhoto(this.attributes.idPartenaire).then((retourApi: PhotoMetier) => {
            return new ResultFile(retourApi, MediaTypes.fromMime(retourApi.mimeType));
        });
    }
}

export class Valider extends RouteAction<any> {
    execute(): Promise<any> {

        logger.debug("Validation d'un partenaire:", this.req.body);
        // TODO mettre en place une validation basée sur un middleware, déclenchant une ValidationError en cas d'erreur
        return Promise.resolve(this.req.body);
    }
}

/**
 * Action de création ou de modification de partenaire
 */
export class EcrirePartenaire extends RouteActionService<any, FichePartenaireService> {

    /**
     * Renvoie l'objet contenant les éléments nécessaires à la validation des données du partenaire.
     * @override
     */
    getDataValidator(): DataValidator {
        return new DataValidator(parValidationSchema);
    }

    /**
     * @override
     */
    getPayload(): any {
        let partenaire = this.req.body;

        if (_.isString(this.req.body.content)) {
            // Le contenu JSON a été posté dans le champ "content" de la requête, on récupère le string qu'on retranscrit en Objet
            partenaire = JSON.parse(this.req.body.content);
        }

        // les uploads sont placés dans req.body.files
        //TODO tetaudf remplacer la verif null par isEmpty de loadash
        if (this.req.files && this.req.files[0] != null) {
            // On replace la photo dans l"objet
            partenaire.photo = {};
            partenaire.photo.nom = this.req.files[0].originalname;
            partenaire.photo.mimeType = this.req.files[0].mimetype;
            partenaire.photo.encoding = this.req.files[0].encoding;
            partenaire.photo.size = this.req.files[0].size;
            partenaire.photo.contenu = this.req.files[0].buffer;
        }
        return partenaire;
    }

    execute(): Promise<any> {

        var partenaire = this.getPayload();

        logger.trace("Action: EcrirePartenaire", partenaire);

        return this.getService().modifier(this.attributes.id, partenaire);

    }
}
