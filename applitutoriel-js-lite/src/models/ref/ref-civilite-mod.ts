import * as Sequelize from "sequelize";
import { HornetSequelizeAttributes } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

export interface CiviliteAttributes extends HornetSequelizeAttributes {
    id: number;
    libelle: string;
}

export let CiviliteModel: Sequelize.DefineAttributes = {
    id: {
        type: Sequelize.INTEGER,
        field: "id_civilite",
        primaryKey: true,
        allowNull: false,
        unique: "civilite_pkey"
    },
    libelle: {
        type: Sequelize.STRING(4),
        field: "civ_libelle"
    }
};
