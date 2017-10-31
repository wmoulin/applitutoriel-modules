import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { Partenaire } from "src/bo/par/par-rpa-bo";

import * as secteurs from "src/resources/mock/adm/adm-lst-data.json";
import * as produits from "src/resources/mock/adm/adm-rps-data.json";
import * as villes from "src/resources/mock/par/par-rpa-villes.json";
import * as pays from "src/resources/mock/par/par-pays-data.json";
import * as partenairesData from "src/resources/mock/par/par-rpa-data-1.json";
import * as partenaireProduits from "src/resources/mock/pro/pro-lsp-data.json";

import * as _ from "lodash";

const logger: Logger = Utils.getLogger("applitutoriel.mock.routes");
let partenaires = (<any>partenairesData).data.liste;

/**
 * Liste des utilisateurs en mode bouchon
 * @type {any[]}
 */
let users = [
    {
        "name": "test",
        "roles": [{"id": 2, "name": "APPLI_TUTO_USER"}]
    },
    {
        "name": "admin",
        "roles": [{"id": 1, "name": "APPLI_TUTO_ADMIN"}, {"id": 2, "name": "APPLI_TUTO_USER"}]
    }
];

function findByUsername(username) {
    for (let i = 0, len = users.length; i < len; i++) {
        let user = users[i];
        if (user.name === username) {
            return user;
        }
    }
    return null;
}

export class BouchonRoutes {

    static build(router) {

        router.post("/partenaires/rechercher", function() {
            this.res.send(
                {
                    "hasTechnicalError": false,
                    "hasBusinessError": false,
                    "status": 200,
                    "url": "url",
                    "errors": [],
                    "data": (<any> partenairesData).data
                });
        });

        router.get("/partenaires/consulter/:id", function(id) {
            let idPartenaire = parseInt(id, 10);
            logger.debug("Recupèrer le partenaire bouchonné qui à l\"id:", idPartenaire);
            let partenaire = _.find(partenaires, function(item: Partenaire) {
                logger.debug(item);
                if (item.id === id) {
                    return true;
                }
            });
            if (partenaire) {
                this.res.send({
                    "hasTechnicalError": false,
                    "hasBusinessError": false,
                    "status": 200,
                    "url": "url",
                    "errors": [],
                    "data": partenaire
                });
            } else {
                this.res.status(404).send({
                    error: "Not found."
                });
            }
        });

        router.delete("/partenaires/supprimer/:id", function(id) {
            let idPartenaire = parseInt(id, 10);
            logger.debug("Suppression du partenaire, id:", id);
            _.remove(partenaires, function(item: Partenaire) {
                if (item.id === id) {
                    return true;
                }
            });

            this.res.send({
                message: "partenaire supprimé"
            });
        });

        router.post("/partenaires", function() {

        });

        router.put("/partenaires/sauvegarder/:id", function() {
            this.res.send({
                "hasTechnicalError": false,
                "hasBusinessError": false,
                "status": 200,
                "url": "url",
                "errors": [],
                "data": {
                    message: "partenaire envoyé"
                }
            });
        });

        router.post("/contact/envoyer", function() {
            this.res.json({
                "hasTechnicalError": false,
                "hasBusinessError": false,
                "status": 200,
                "url": "url",
                "errors": [],
                "data": {
                    message: "Courriel envoyé"
                }
            });
        });

        router.get("/secteurs", function() {
            this.res.send(secteurs);
        });
        router.get("/produits/consulter/:id", function() {
            this.res.json(partenaireProduits);
        });
        /*
                router.get("/produits", function() {
                    this.res.send(produits);
                });*/
        router.get("/partenaires/villes", function() {
            this.res.send(villes);
        });
        router.get("/partenaires/pays", function() {
            this.res.send(pays);
        });
        router.post("/partenaires/pays/nationalites/rechercher", function() {
            this.res.send(pays);
        });

        router.post("/utilisateurs/auth", function() {
            let user = findByUsername(this.req.body.login);
            this.res.json({
                "hasTechnicalError": false,
                "hasBusinessError": false,
                "status": 200,
                "url": "url",
                "errors": [],
                "data": user
            });
        });
    }
}
