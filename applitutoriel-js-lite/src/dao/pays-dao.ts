import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { EntityDAO } from "src/dao/entity-dao";
import Map from "hornet-js-bean/src/decorators/Map";
import { PaysMetier } from "applitutoriel-js-common/src/models/ref/ref-pay-mod";

const logger: Logger = Utils.getLogger("applitutoriel.src.dao.pays-dao");

export class PaysDAO extends EntityDAO {

    constructor() {
        super();
    }

    @Map(PaysMetier)
    listerPays(): Promise<Array<PaysMetier>> {
        return this.modelDAO.paysEntity.findAll();
    }

    selectNationaliteById(id: number): Promise<PaysMetier> {
        return this.modelDAO.paysEntity.findOne({
            where: {id: id},
            attributes: ["id_Pays", "payNationalite"]
        });
    }

    selectNationaliteLike(nationalite: string): Promise<Array<PaysMetier>> {
        return this.modelDAO.paysEntity.findAll({
            where: {
                nationalite: {
                    $like: "%" + nationalite + "%"
                }
            }
        });
    }

    selectNationaliteByPays(id: number): Promise<PaysMetier> {
        return this.modelDAO.paysEntity.findOne({
            where: {id: id},
            attributes: ["nationalite"]
        });
    }

    selectPays(id: number): Promise<PaysMetier> {
        return this.modelDAO.paysEntity.findById(id);
    }
}
