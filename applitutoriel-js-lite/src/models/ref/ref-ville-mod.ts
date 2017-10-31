import * as Sequelize from "sequelize";
import { PaysAttributes } from "src/models/ref/ref-pay-mod";
import { HornetSequelizeAttributes } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

export interface VilleAttributes extends HornetSequelizeAttributes {
    id: number;
    libelle: string;
    pays: number;
    lePays: PaysAttributes;

    getLePays(): Promise<PaysAttributes>;
}

export let VilleModel: Sequelize.DefineAttributes = {
    id: {
        type: Sequelize.INTEGER,
        field: "id_ville",
        primaryKey: true,
        allowNull: false,
        unique: "ville_pkey"
    },
    libelle: {
        type: Sequelize.STRING(50),
        field: "vil_libelle"
    },
    pays: {
        type: Sequelize.INTEGER,
        field: "id_pays",
        references: {
            model: "PaysModel",
            key: "id"
        }
    }
};
