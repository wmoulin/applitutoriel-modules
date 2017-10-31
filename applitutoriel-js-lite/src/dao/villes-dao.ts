import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { EntityDAO } from "src/dao/entity-dao";
import Map from "hornet-js-bean/src/decorators/Map";
import { VilleMetier } from "applitutoriel-js-common/src/models/ref/ref-ville-mod";

const logger: Logger = Utils.getLogger("applitutoriel.src.dao.villes-dao");

export class VillesDAO extends EntityDAO {

    constructor() {
        super();
    }

    @Map(VilleMetier)
    listerVilles() {
        return this.modelDAO.villeEntity.findAll({
            include: [{
                model: this.modelDAO.paysEntity,
                as: "lePays"
            }]
        });
    }

    @Map(VilleMetier)
    listerVillesByPays(id) {
        return this.modelDAO.villeEntity.findAll({
            where: {pays: id}
        });
    }

    @Map(VilleMetier)
    selectVille(id) {
        return this.modelDAO.villeEntity.findById(id);
    }
}
