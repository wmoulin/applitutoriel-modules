import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { EntityDAO } from "src/dao/entity-dao";
import Map from "hornet-js-bean/src/decorators/Map";
import { PhotoMetier } from "applitutoriel-js-common/src/models/photo-mod";
import { PhotoDTO } from "src/models/seq-photo-model";

const logger: Logger = Utils.getLogger("applitutoriel.src.dao.photo-dao");

export class PhotoDAO extends EntityDAO {

    constructor() {
        super();
    }

    @Map(PhotoMetier)
    selectById(id: number) {
        return this.modelDAO.photoEntity.findById(id);
    }

    @Map()
    insert(@Map(PhotoDTO) data) {
        return this.modelDAO.photoEntity.create(data);
    }
}
