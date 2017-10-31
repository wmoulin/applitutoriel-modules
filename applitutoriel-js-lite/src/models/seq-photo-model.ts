import * as Sequelize from "sequelize";
import Bean from "hornet-js-bean/src/decorators/Bean";
import Map from "hornet-js-bean/src/decorators/Map";
import Alias from "hornet-js-bean/src/decorators/Alias";
import { HornetSequelizeAttributes } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

export interface PhotoAttributes extends HornetSequelizeAttributes {
    id: number;
    nom: string;
    mimetype: string;
    encoding: string;
    size: string;
    contenu: Buffer;
}

@Bean
export class PhotoDTO {
    @Map()
    id: number;
    @Map()
    nom: string;
    @Map()
    @Alias("mimeType")
    mimetype: string;
    @Map()
    encoding: string;
    @Map()
    size: string;
    @Map()
    contenu: Buffer;
}

export let PhotoModel: Sequelize.DefineAttributes = {
    id: {
        type: Sequelize.INTEGER,
        field: "id_photo",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: "photo_pkey"
    },
    nom: {
        type: Sequelize.STRING(500),
        field: "nom"
    },
    mimetype: {
        type: Sequelize.STRING(100),
        field: "mimetype"
    },
    encoding: {
        type: Sequelize.STRING(100),
        field: "encoding"
    },
    size: {
        type: Sequelize.INTEGER,
        field: "size"
    },
    contenu: {
        type: Sequelize.BLOB,
        field: "contenu"
    }
};
