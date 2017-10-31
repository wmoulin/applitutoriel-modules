import * as Sequelize from "sequelize";
import { HornetSequelizeAttributes } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

export interface SecteurAttributes extends HornetSequelizeAttributes {
    id: number;
    nom: string;
    desc: string;
    dateCreat: string;
    auteurCreat: string;
    dateMajEnreg: string;
    auteurMaj: string;
    dateSupEnreg: string;
    auteurSupEnreg: string;
}

export let SecteurModel: Sequelize.DefineAttributes = {
    id: {
        type: Sequelize.INTEGER,
        field: "id_secteur",
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: Sequelize.STRING(50),
        field: "sec_nom"
    },
    desc: {
        type: Sequelize.STRING(200),
        field: "sec_descr"
    },
    dateCreat: {
        type: Sequelize.DATE,
        field: "sec_date_creat",
        defaultValue: Sequelize.fn("NOW")
    },
    auteurCreat: {
        type: Sequelize.STRING(10),
        field: "sec_auteur_creat"
    },
    dateMajEnreg: {
        type: Sequelize.DATE,
        field: "sec_date_maj",
        defaultValue: Sequelize.fn("NOW")
    },
    auteurMaj: {
        type: Sequelize.STRING(10),
        field: "sec_auteur_maj"
    },
    dateSupEnreg: {
        type: Sequelize.DATE,
        field: "sec_date_suppr"
    },
    auteurSupp: {
        type: Sequelize.STRING(10),
        field: "sec_auteur_suppr"
    }
};
