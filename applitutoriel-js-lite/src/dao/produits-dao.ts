import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { EntityDAO } from "src/dao/entity-dao";

const logger: Logger = Utils.getLogger("applitutoriel.src.dao.produits-dao");

export class ProduitsDAO extends EntityDAO {

    constructor() {
        super();
    }

    listerProduits() {
        return this.modelDAO.produitEntity.findAll();
    }

    repartition() {
        return this.getQuery().query(
            "SELECT COUNT(*) * 100 /(SELECT COUNT(*) FROM produit) AS \"value\", sec_nom AS \"label\" " +
            "FROM produit INNER JOIN secteur ON produit.id_secteur = secteur.id_secteur GROUP BY sec_nom",
            {type: this.getQuery().QueryTypes.SELECT});
    }
}