import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { SecteurMetier } from "applitutoriel-js-common/src/models/adm/sec-mod";
import { SecteursDAO } from "src/dao/secteurs-dao";
import { Promise } from "hornet-js-utils/src/promise-api";
import { AdministrationSecteurService } from "applitutoriel-js-common/src/services/data/adm/adm-secteur-service";

const logger: Logger = Utils.getLogger("applitutoriel.src.services.data.sec.secteur-service-impl");

export class SecteurServiceImpl extends AdministrationSecteurService {

    private secteursDAO: SecteursDAO = new SecteursDAO();

    lister(): Promise<Array<SecteurMetier>> {
        return this.secteursDAO.listerSecteurs();
    }

    modifier(id: number, data): Promise<any> {
        let obj = {
            id: id,
            nom: data.nom,
            desc: data.desc
        };

        return this.secteursDAO.updateById(id, obj);
    }

    creer(data): Promise<any> {
        let obj = {
            nom: data.nom,
            desc: data.desc,
            auteurCreat: data.user,
            auteurMaj: data.user
        };
        return this.secteursDAO.insert(obj);
    }

    supprimer(id: number): Promise<any> {
        logger.debug("supprimerSecteur data :", id);
        return new Promise((resolve, reject) => {
            return this.secteursDAO.deleteById(id).then((result) => {
                resolve(true);
            }).catch((error) => {
                let errorName = error.name;
                if ((errorName == "SequelizeForeignKeyConstraintError") || (error.index == "fk_produit_secteur")) {
                    reject(new BusinessError("ER-AD-ESE-07"));
                } else {
                    throw error;
                }
            });
        });
    }
}