import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { EntityDAO } from "src/dao/entity-dao";

const logger: Logger = Utils.getLogger("applitutoriel.src.dao.civilites-dao");

export class CivilitesDAO extends EntityDAO {

    constructor() {
        super();
    }

}
