import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { AuthService } from "applitutoriel-js-common/src/services/data/auth/auth-service";
import { ServiceSecure } from "hornet-js-core/src/services/service-secure";
import { Promise } from "hornet-js-utils/src/promise-api";
import { Response } from "superagent";
import * as fs from "fs";
import * as path from "path";

const jwt = require("jsonwebtoken");

const logger: Logger = Utils.getLogger("applitutoriel-js-common.mock.services.page.auth.auth-service-impl-mock");

/**
 * Liste des utilisateurs en mode bouchon
 * @type {any[]}
 */
const users = [
    {
        "name": "test",
        "roles": [ { "id": 2, "name": "APPLI_TUTO_USER" }]
    },
    {
        "name": "admin",
        "roles": [ { "id": 1, "name": "APPLI_TUTO_ADMIN" }, { "id": 2, "name": "APPLI_TUTO_USER" }]
    }
];

function findByUsername(username) {
    for (let i = 0, len = users.length; i < len; i++) {
        let user = users[ i ];
        if (user.name === username) {
            return user;
        }
    }
    return null;
}

/**
 * Implementation des services pour l'authentification
 * @class
 * @implements {AuthService}
 * @extends {ServiceApi}
 */
export class AuthServiceMockImpl extends AuthService {

    /**
     * recherche de l'identité
     * @param {object} data
     */
    auth(data): Promise<any> {
        logger.trace("SERVICES MOCK - auth", data);
        let user = findByUsername(data.login);
        return Promise.resolve(user);
    }

    saveToken(response: Response) {

        if (response && response.get && response.get(ServiceSecure.HEADER_AUTH)
            && response.get(ServiceSecure.HEADER_AUTH).slice(0, "Bearer ".length) == "Bearer ") {

            let token: string = response.get(ServiceSecure.HEADER_AUTH).substring("Bearer ".length);

            Utils.getContinuationStorage().get("hornet.request").getSession().authorizationToken = token;
            var cert = fs.readFileSync(path.join(__dirname, "../../../../config/keys/public.pem"));  // get public key
            jwt.verify(token, cert, { algorithms: [ "HS256", "RS512" ] }, function (err, decoded) {
                logger.trace("JWToken : ", decoded);
            });
        }

    }

    getToken() {
        return null;
    }
}
