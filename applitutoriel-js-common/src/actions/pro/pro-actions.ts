import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
import { ProduitService } from "src/services/data/pro/produit-service";

const logger: Logger = Utils.getLogger("applitutoriel.actions.pro.pro-actions");

export class ListerProduits extends RouteActionService<any, ProduitService> {
    execute(): Promise<any> {
        return this.getService().lister();
    }
}
