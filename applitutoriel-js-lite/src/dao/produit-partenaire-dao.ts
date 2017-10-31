import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { EntityDAO } from "src/dao/entity-dao";

const logger: Logger = Utils.getLogger("applitutoriel.src.dao.produit-partenaire-dao");

export class ProduitPartenaireDAO extends EntityDAO {

    constructor() {
        super();
    }

    supprimerProduitByPartenaire(idPartenaire: number | Array<number>): Promise<number> {
        return this.modelDAO.produitPartenaireEntity.destroy({
            where: {
                idPartenaire: idPartenaire
            }
        });
    }

}
