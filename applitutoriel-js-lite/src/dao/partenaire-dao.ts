import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { EntityDAO } from "src/dao/entity-dao";
import { PartenaireMetier } from "applitutoriel-js-common/src/models/par/par-mod";
import Map from "hornet-js-bean/src/decorators/Map";
import { PartenaireDTO } from "src/models/par/seq-par-mod";

const logger: Logger = Utils.getLogger("applitutoriel.src.dao.partenaire-dao");

export class PartenaireDAO extends EntityDAO {
    constructor() {
        super();
    }

    @Map(PartenaireMetier)
    selectByCriteres(isClient: boolean, isVIP: boolean, startDate, sort: {}): Promise<Array<PartenaireMetier>> {
        if (!sort) {
            sort = [{
                key: "id_partenaire",
                dir: 0
            }];
        }
        let tri = sort[0];

        let seqTri = [tri["key"], (!tri["dir"] || tri["dir"] == 0) ? "ASC" : "DESC"];
        let criteria = {
            where: {
                isClient: isClient,
                dateModif: {
                    $gte: startDate
                }
            },
            include: [{
                model: this.modelDAO.villeEntity,
                as: "laVille"
            }],
            order: [seqTri]
        };
        if (isVIP !== undefined) {
            criteria.where["isVIP"] = isVIP;
        }
        return this.modelDAO.partenaireEntity.findAll(criteria);
    }

    @Map(PartenaireMetier)
    selectById(id: number): Promise<PartenaireMetier> {
        return this.modelDAO.partenaireEntity.findOne({
            where: {
                id: id
            },
            include: [{
                model: this.modelDAO.villeEntity,
                as: "laVille",
                include: [{
                    model: this.modelDAO.paysEntity,
                    as: "lePays"
                }]
            }, {
                model: this.modelDAO.paysEntity,
                as: "laNationalite"
            }, {
                model: this.modelDAO.civiliteEntity,
                as: "laCivilite"
            }, {
                model: this.modelDAO.photoEntity,
                as: "laPhoto"
            }, {
                model: this.modelDAO.produitEntity,
                as: "listeProduit"
            }]
        }).then((res) => {
            return res;
        });

    }

    @Map(PartenaireMetier)
    selectAll(id: number | Array<number>): Promise<Array<PartenaireMetier>> {
        return this.modelDAO.partenaireEntity.findAll({
            where: {
                id: id
            },
            include: [{
                model: this.modelDAO.villeEntity,
                as: "laVille",
                include: [{
                    model: this.modelDAO.paysEntity,
                    as: "lePays"
                }]
            }, {
                model: this.modelDAO.paysEntity,
                as: "laNationalite"
            }, {
                model: this.modelDAO.civiliteEntity,
                as: "laCivilite"
            }, {
                model: this.modelDAO.photoEntity,
                as: "laPhoto"
            }]
        });
    }

    selectByIdSQL(id: number | Array<number>) {
        let query: string = "SELECT * FROM partenaire " +
            "INNER JOIN ville on partenaire.id_ville = ville.id_ville " +
            "INNER JOIN pays as ville_pays on ville.id_pays = ville_pays.id_pays " +
            "INNER JOIN pays on partenaire.id_pays = pays.id_pays " +
            "INNER JOIN civilite on partenaire.id_civilite = civilite.id_civilite " +
            "LEFT OUTER JOIN photo on partenaire.id_photo = photo.id_photo " +
            "WHERE partenaire.id_partenaire = :identifiant";
        return this.getQuery().query(query,
            {
                replacements: {
                    identifiant: id
                },
                model: this.modelDAO.partenaireEntity,
                type: this.getQuery().QueryTypes.SELECT
            }
        );
    }

    deleteByIdIfNotVIP(id: number | Array<number>): Promise<number> {
        return this.modelDAO.partenaireEntity.destroy({
            where: {
                id: id,
                isVIP: false
            }
        });
    }

    deleteById(id: number | Array<number>): Promise<number> {
        return this.modelDAO.partenaireEntity.destroy({where: {id: id}});
    }

    @Map()
    updateById(id: number, @Map(PartenaireDTO) partenaire): Promise<any> {
        partenaire.dateModif = new Date();
        this.verificationFormatDonneesPartenaire(partenaire);
        return this.modelDAO.partenaireEntity.update(partenaire, {where: {id: id}});
    }

    @Map()
    insert(@Map(PartenaireDTO) partenaire): Promise<any> {
        partenaire.dateCreat = new Date();
        partenaire.dateModif = new Date();
        this.verificationFormatDonneesPartenaire(partenaire);
        return this.modelDAO.partenaireEntity.create(partenaire);
    }

    private verificationFormatDonneesPartenaire(partenaire) {
        if ((partenaire.dateNaissance) && !(partenaire.dateNaissance instanceof Date)) {
            partenaire.dateNaissance = new Date(partenaire.dateNaissance);
        }
    }

}