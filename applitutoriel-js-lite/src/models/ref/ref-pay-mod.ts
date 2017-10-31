import * as Sequelize from "sequelize";
import { HornetSequelizeAttributes } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

export interface PaysAttributes extends HornetSequelizeAttributes {
    id: number;
    libelle: string;
    nationalite: string;
}

export let PaysModel: Sequelize.DefineAttributes = {
    id: {
        type: Sequelize.INTEGER,
        field: "id_pays",
        primaryKey: true,
        allowNull: false,
        unique: "pays_pkey"
    },
    libelle: {
        type: Sequelize.STRING(50),
        field: "pay_libelle"
    },
    nationalite: {
        type: Sequelize.STRING(50),
        field: "pay_nationalite"
    }
};
