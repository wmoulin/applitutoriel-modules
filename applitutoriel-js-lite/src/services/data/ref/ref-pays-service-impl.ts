import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { PaysDAO } from "src/dao/pays-dao";
import { VillesDAO } from "src/dao/villes-dao";
import { ReferentielPaysService } from "applitutoriel-js-common/src/services/page/ref/ref-pays-service";
import { PaysMetier } from "applitutoriel-js-common/src/models/ref/ref-pay-mod";
import { VilleMetier } from "applitutoriel-js-common/src/models/ref/ref-ville-mod";

const logger: Logger = Utils.getLogger("applitutoriel.src.services.ref.ref-pays-service-impl");

export class ReferentielPaysServiceImpl extends ReferentielPaysService {

    private paysDAO: PaysDAO = new PaysDAO();
    private villesDAO: VillesDAO = new VillesDAO();

    listerPays(): Promise<Array<PaysMetier>> {
        logger.trace("SERVICES - listerPays");
        return this.paysDAO.listerPays().catch(function (err) {
            throw new BusinessError(err);
        });
    }

    rechercherNationalites(nationalite: string): Promise<Array<PaysMetier>> {
        logger.trace("SERVICES - rechercherNationalites : ", nationalite);
        if (!nationalite) {
            nationalite = "";
        }
        return this.paysDAO.selectNationaliteLike(nationalite).catch(function (err) {
            throw new BusinessError(err);
        });
    }

    listerVilles(): Promise<Array<VilleMetier>> {
        logger.trace("SERVICES - listerVilles");
        return this.villesDAO.listerVilles().catch(function (err) {
            throw new BusinessError(err);
        });
    }

    chercherPays(id): Promise<PaysMetier> {
        logger.trace("SERVICES - chercherPays, id :", id);
        return this.paysDAO.selectPays(id)
        .catch(function (err) {
            throw new BusinessError(err);
        });
    }

    chercherVille(id): Promise<VilleMetier> {
        logger.trace("SERVICES - chercherVille, id :", id);
        return this.villesDAO.selectVille(id)
        .catch(function (err) {
            throw new BusinessError(err);
        });
    }
}