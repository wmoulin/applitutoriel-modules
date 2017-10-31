import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { ProduitPartenaireDAO } from "src/dao/produit-partenaire-dao";
import { IService } from "hornet-js-core/src/services/service-api";

const logger: Logger = Utils.getLogger("applitutoriel.src.services.data.par.pro-par-service-data-impl");

export class ProduitPartenaireServiceImpl implements IService {

    private produitPartenaireDAO: ProduitPartenaireDAO = new ProduitPartenaireDAO();

    constructor() {
    }

    supprimerAffectationsPartenaire(idPartenaire: number | Array<number>): Promise<number> {
        logger.fatal("supprimerAffectationsPartenaire partenaire : ", idPartenaire);
        return this.produitPartenaireDAO.supprimerProduitByPartenaire(idPartenaire).catch(function (err) {
            throw new BusinessError(err);
        });
    }
}
