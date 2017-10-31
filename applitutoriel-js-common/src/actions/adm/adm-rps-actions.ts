import { FicheProduitService } from "src/services/page/adm/adm-fpo-service-page";
import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";

export class ListerProduits extends RouteActionService<any, FicheProduitService> {
    execute(): Promise<any> {
        return this.getService().listerProduits();
    }
}

export class Repartition extends RouteActionService<any, FicheProduitService> {
    execute(): Promise<any> {
        return this.getService().repartition();
    }
}
