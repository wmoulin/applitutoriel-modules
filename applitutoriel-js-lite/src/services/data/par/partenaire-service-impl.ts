import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
import { FormRecherchePartenaire, PartenaireResult } from "applitutoriel-js-common/src/services/type/par/par-types";

import { PartenaireDAO } from "src/dao/partenaire-dao";
import { VillesDAO } from "src/dao/villes-dao";
import { PaysDAO } from "src/dao/pays-dao";
import { PartenaireMetier } from "applitutoriel-js-common/src/models/par/par-mod";
import { ProduitPartenaireDAO } from "src/dao/produit-partenaire-dao";
import { PhotoDAO } from "src/dao/photo-dao";
import { Transactional } from "hornet-js-database/src/decorators/dec-transactional";
import { MediaType } from "hornet-js-core/src/protocol/media-type";
import { SecteurServiceImpl } from "src/services/data/sec/secteur-service-impl";
import { PartenaireRechercheParameter } from "applitutoriel-js-common/src/services/type/par/par-rpa-prm";
import { Pagination } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { Injector } from "hornet-js-core/src/inject/injector";
import { Promise } from "hornet-js-utils/src/promise-api";

const logger: Logger = Utils.getLogger("applitutoriel.src.services.data.par.partenaire-service-impl");

class TablePartenaireImpl {
    listeCriteres: FormRecherchePartenaire;
    nbTotal: number;
    liste: PartenaireResult[];
    pagination: Pagination;
}

class PartenaireResultImpl implements PartenaireResult {
    id: number;
    nom: string;
    prenom: string;
    proCourriel: string;
    organisme: string;
    isVIP: boolean;
    dateModif: number;
}

/**
 * Implementation des services de recherche pour les partenaires
 * @class
 * @implements {PartenaireService, IService}
 */
export class PartenaireServiceImpl extends PartenaireService {

    private partenaireDAO: PartenaireDAO = new PartenaireDAO();
    private produitPartenaireDAO: ProduitPartenaireDAO = new ProduitPartenaireDAO();
    /** DAO des villes */
    private villeDAO: VillesDAO = new VillesDAO();
    /** DAO des pays */
    private paysDAO: PaysDAO = new PaysDAO();
    /** DAO des photos */
    private photoDAO: PhotoDAO = new PhotoDAO();

    /** service de gestion des partenaires */
    private secteurApi: SecteurServiceImpl = new SecteurServiceImpl();

    rechercher(data: PartenaireRechercheParameter, reqMimeType: MediaType): Promise<any> {
        logger.trace("SERVICES - rechercher : ", data, reqMimeType);

        function nullToBoolean(nullData: any) {
            if (nullData == null) {
                nullData = false;
            }
            return nullData;
        }

        let isClient = nullToBoolean(data.criteres.partenaire.isClient);
        let keysort: string = (data.sort ? data.sort[ 0 ].key : "id_partenaire") as string;
        let p = this.partenaireDAO.selectByCriteres(isClient, data.criteres.partenaire.isVIP, data.criteres.startDate, data.sort);
        return p.then((listPartenaire: Array<PartenaireMetier>) => {
            let tablePartenaire: TablePartenaireImpl = new TablePartenaireImpl();
            tablePartenaire.nbTotal = listPartenaire.length;
            tablePartenaire.pagination = this.paginationServer(data.pagination, listPartenaire);
            tablePartenaire.listeCriteres = data.criteres;
            tablePartenaire.liste = new Array<PartenaireResult>();
            let filteredListPartenaire: Array<PartenaireMetier> =
                this.selectionListePartenaire(tablePartenaire.pagination, listPartenaire);
            filteredListPartenaire.forEach((partenaire: PartenaireMetier) => {
                let partenaireResult: PartenaireResult = new PartenaireResultImpl();
                partenaireResult.id = partenaire.id;
                partenaireResult.nom = partenaire.nom;
                partenaireResult.prenom = partenaire.prenom;
                partenaireResult.proCourriel = partenaire.proCourriel;
                partenaireResult.organisme = partenaire.organisme;
                partenaireResult.isVIP = partenaire.isVIP;
                partenaireResult.dateModif = partenaire.dateModif;
                tablePartenaire.liste.push(partenaireResult);
            });
            return tablePartenaire;
        });
    }

    private selectionListePartenaire(pagination: Pagination, dataPartenaires: Array<PartenaireMetier>): Array<PartenaireMetier> {
        // Pagination serveur
        let minIndex: number = (pagination.pageIndex - 1) * pagination.itemsPerPage;
        let maxIndex: number = Math.min(pagination.totalItems, minIndex + pagination.itemsPerPage);

        return dataPartenaires.slice(minIndex, maxIndex);
    }

    private paginationServer(pagination: Pagination, dataPartenaires: Array<PartenaireMetier>): Pagination {
        let res: Pagination = pagination || { itemsPerPage: 0 };
        res.totalItems = dataPartenaires.length;
        if (!res.pageIndex || res.pageIndex == 0) {
            res.pageIndex = 1;
        }
        let itemsPerPage: number = !res.itemsPerPage || res.itemsPerPage == 0 ? 10 : res.itemsPerPage;

        // Recuperation du nombre total de pages
        let nombrePages: number = Math.max(1, Math.ceil(res.totalItems / itemsPerPage));

        // Recalcul indexPage
        let indexPagePartenaires: number = Math.min(res.pageIndex, nombrePages);
        res.pageIndex = indexPagePartenaires;
        res.itemsPerPage = itemsPerPage;

        return res;
    }

    /**
     * Suppression d'un partenaire
     */
    supprimer(id: any): Promise<any> {
        return this.suppressionDunPartenaire(id).then((retour) => {
            return true;
        }).catch((error) => {
            return false;
        });
    }

    supprimerPage(id: any): Promise<any> {
        // Non utilisée
        return Promise.resolve(false);
    }

    supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any> {
        return this.suppressionDesPartenaires(partenaires)
            .catch((error) => {
                return {};
            }).then((identifiants: number[]) => {
                return identifiants;
            });
    }

    private suppressionDesPartenaires(partenaires: PartenaireResult[]): Promise<number[] | {}> {
        return new Promise<number[] | {}>((resolve, reject) => {
            let idsConfirmation: Array<number> = new Array<number>();
            let idsError: Array<number> = new Array<number>();
            return Promise.each(partenaires, (partenaire: PartenaireResult) => {
                return this.suppressionDunPartenaire(partenaire.id).then((result: boolean) => {
                    idsConfirmation.push(partenaire.id);
                }).catch((error) => {
                    idsError.push(partenaire.id);
                });
            }).catch((error) => {
                reject(error);
            }).then((result) => {
                resolve(idsConfirmation);
            });
        });
    }

    @Transactional({ configDatabase: Injector.getRegistered("configApplitutoDatabase") })
    private suppressionDunPartenaire(id: number): Promise<any> {
        return this.produitPartenaireDAO.supprimerProduitByPartenaire(id).then(() => {
            return this.partenaireDAO.deleteByIdIfNotVIP(id);
        });
    }

    editer(id: number, data): Promise<any> {
        return this.partenaireDAO.updateById(id, data).catch(function (err) {
            throw new BusinessError(err);
        });
    }

    creer(data, cb: any) {
        this.partenaireDAO.insert(data).catch(function (err) {
            throw new BusinessError(err);
        }).then(cb);
    }

    /**
     * Cherche le partenaire et ses informations pour un id
     */
    chercherPartenaireById(id: number): Promise<PartenaireMetier> {
        return this.partenaireDAO.selectById(id)
            .catch(function (err) {
                throw new BusinessError(err);
            });
    }

    chercherPartenairesByIds(ids: Array<number>): Promise<Array<PartenaireMetier>> {
        return this.partenaireDAO.selectAll(ids)
            .catch(function (err) {
                throw new BusinessError(err);
            });
    }

    exporter(reqMimeType: MediaType): Promise<any> {
        logger.trace("SERVICES - exporter : ", reqMimeType);
        return Promise.resolve(true);
    }

    exporterODF(reqMimeType: MediaType): Promise<any> {
        logger.trace("SERVICES - exporterODF : ", reqMimeType);
        return Promise.resolve(true);
    }

    listerSecteurs(): Promise<any> {
        return this.secteurApi.lister();
    }

    /**
     * Récupère les données liés au partenaires
     * @param id du partenaire
     * @return Promise<object>
     */
    fichePartenaire(id: number): Promise<any> {
        logger.trace("fichePartenaire id :", id);
        return this.partenaireDAO.selectById(id).then((result) => {
            let res = result;
            if (res && res.satisfaction) {
                res.satisfaction = { "ids": (res.satisfaction as string).split(",") };
            }
            return res;
        });
    }

    /**
     * Récupère les données nécessaires pour l'affichage du partenaire
     * @return Promise<object>
     */
    getFormData(): Promise<any> {
        return Promise.all([ this.villeDAO.listerVilles(), this.paysDAO.listerPays() ])
            .then((results: any[]) => {
                return ({
                    villes: results[ 0 ],
                    pays: results[ 1 ]
                });
            });
    }

    /**
     * Modifie ou crée un partenaire en base
     * @return Promise<object>
     */
    @Transactional({ configDatabase: Injector.getRegistered("configApplitutoDatabase") })
    modifier(id: any, partenaire: any): Promise<any> {
        logger.trace("modifier id :", id);
        if (partenaire.satisfaction.ids) {
            partenaire.satisfaction = partenaire.satisfaction.ids.join(",");
        } else {
            partenaire.satisfaction = "";
        }
        partenaire.isVIP = !(partenaire.isVIP == "undefined" || partenaire.isVIP == null);
        return this.insertPhoto(partenaire).then((retourPartenaire) => {
            if (id != null) {
                retourPartenaire.id = id;
                return this.partenaireDAO.updateById(id, retourPartenaire).then(retourApi => {
                    logger.trace("Retour d\"enregistrement OK", retourApi);
                    return retourApi;
                });
            } else {
                return this.partenaireDAO.insert(retourPartenaire).then(retourApi => {
                    logger.trace("Retour d\"enregistrement OK", retourApi);
                    return retourApi;
                });
            }
        });
    }

    /**
     * Insère la photo du partenaire s'il celle-ci existe.
     * @return Promise<object>
     */
    insertPhoto(partenaire: PartenaireMetier): Promise<any> {
        if (partenaire.photo != null) {
            return this.photoDAO.insert(partenaire.photo).then(retourApi => {
                logger.trace("Retour d\"enregistrement OK", retourApi);
                partenaire.photo.id = retourApi.id;
                return partenaire;
            });
        } else {
            return Promise.resolve(partenaire);
        }
    }

    /**
     * Récupère la photo du partenaire
     * @return Promise<object>
     */
    lirePhoto(idPartenaire: any): Promise<any> {
        logger.trace("lirePhoto du partenaire id :", idPartenaire);
        return this.partenaireDAO.selectById(idPartenaire).then((partenaire: PartenaireMetier) => {
            if (!partenaire.photo) throw new BusinessError("ER-PA-FPA-10");
            return partenaire.photo;
        });
    }
}