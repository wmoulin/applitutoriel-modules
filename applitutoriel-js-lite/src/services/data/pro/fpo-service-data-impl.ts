import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { FicheProduitService } from "applitutoriel-js-common/src/services/page/adm/adm-fpo-service-page";
import { ProduitsDAO } from "src/dao/produits-dao";
import { ProduitMetier } from "applitutoriel-js-common/src/models/pro/pro-mod";
import { IService } from "hornet-js-core/src/services/service-api";

const logger: Logger = Utils.getLogger("applitutoriel.src.services.data.pro.fpo-service-data-impl");

export class FicheProduitServiceImpl implements FicheProduitService, IService {

    private produitDAO: ProduitsDAO = new ProduitsDAO();

    constructor() {
    }

    listerProduits(): Promise<Array<ProduitMetier>> {
        return this.produitDAO.listerProduits();
    }

    lister(): Promise<Array<ProduitMetier>> {
        return this.produitDAO.listerProduits();
    }

    repartition(): Promise<any> {
        return this.produitDAO.repartition().then(repartition => {
            let colors = ["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099"];
            logger.trace("retour API : ", repartition);
            for (var i = 0; i < repartition.length; i++) {
                repartition[i]["color"] = colors[i];
            }
            return repartition;
        });
    }
}