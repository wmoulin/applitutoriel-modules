import * as Sequelize from "sequelize";
import { SecteurMetier } from "applitutoriel-js-common/src/models/adm/sec-mod";
import { HornetSequelizeAttributes } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

export class ProduitMetier {
    id: number;
    nom: string;
    desc: string;
    secteur: SecteurMetier;
}

export interface ProduitAttributes extends HornetSequelizeAttributes {
    id: number;
    nom: string;
    desc: string;
    idSecteur: number;

    getSecteur();
    getProduitPartenaire();
}

export class ProduitDTO {
    id: number;
    nom: string;
    desc: string;
    idSecteur: number;
}

export let ProduitModel: Sequelize.DefineAttributes = {
    id: {
        type: Sequelize.INTEGER,
        field: "id_produit",
        primaryKey: true,
        allowNull: false,
        unique: "produit_pkey"
    },
    nom: {
        type: Sequelize.STRING(50),
        field: "pro_nom"
    },
    desc: {
        type: Sequelize.STRING(200),
        field: "pro_descr"
    },
    idSecteur: {
        type: Sequelize.INTEGER,
        field: "id_secteur",
        references: {
            model: "SecteurModel",
            key: "id"
        }
    }
};
