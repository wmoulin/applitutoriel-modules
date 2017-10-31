import * as Sequelize from "sequelize";
import { HornetSequelizeAttributes } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

export interface ProduitPartenaireAttributes extends HornetSequelizeAttributes {
    produit: number;
    partenaire: number;

    getProduit();

    getPartenaire();
}

export class ProduitPartenaireDTO {
    idProduit: number;
    idPartenaire: number;
}

export let ProduitPartenaireModel: Sequelize.DefineAttributes = {
    idProduit: {
        type: Sequelize.INTEGER,
        field: "id_produit",
        primaryKey: true,
        allowNull: false,
        unique: "pk_produit_partenaire",
        references: {
            model: "ProduitModel",
            key: "id"
        }
    },
    idPartenaire: {
        type: Sequelize.INTEGER,
        field: "id_partenaire",
        primaryKey: true,
        allowNull: false,
        unique: "pk_produit_partenaire",
        references: {
            model: "PartenaireModel",
            key: "id"
        }
    }
};
