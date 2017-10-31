import * as Sequelize from "sequelize";
import Bean from "hornet-js-bean/src/decorators/Bean";
import Map from "hornet-js-bean/src/decorators/Map";
import Alias from "hornet-js-bean/src/decorators/Alias";
import { ProduitAttributes } from "src/models/pro/model-produit";
import { ProduitPartenaireDTO } from "src/models/par/seq-pro-par-mod";
import { PaysAttributes } from "src/models/ref/ref-pay-mod";
import { VilleAttributes } from "src/models/ref/ref-ville-mod";
import { CiviliteAttributes } from "src/models/ref/ref-civilite-mod";
import { PhotoAttributes } from "src/models/seq-photo-model";
import { HornetSequelizeAttributes } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

export interface PartenaireAttributes extends HornetSequelizeAttributes {
    id?: number;
    ville?: number;
    civilite?: number;
    pays?: number;
    photo?: number;
    isClient?: boolean;
    isVIP?: boolean;
    nom?: string;
    prenom?: string;
    nomLocal?: string;
    prenomLocal?: string;
    dateNaissance?: string;
    organisme?: string;
    fonction?: string;
    proTelFixe?: string;
    proTelPort?: string;
    proCourriel?: string;
    proFax?: string;
    proAdrRue?: string;
    proAdrCP?: string;
    assistNom?: string;
    assistPrenom?: string;
    assistTel?: string;
    assistCourriel?: string;
    commentaire?: string;
    satisfaction?: string | string[];
    dateCreat?: string;
    dateModif?: string;

    laNationalite: PaysAttributes;
    laVille: VilleAttributes;
    laCivilite: CiviliteAttributes;
    laPhoto: PhotoAttributes;
    listeProduit: Array<ProduitAttributes>;

    getLaNationalite(): Promise<PaysAttributes>;

    getLaVille(): Promise<VilleAttributes>;

    getLaCivilite(): Promise<CiviliteAttributes>;

    getLaPhoto(): Promise<PhotoAttributes>;

    getListeProduit(): Promise<Array<ProduitAttributes>>;
}

@Bean
export class PartenaireDTO {
    @Map()
    id: number;
    @Map()
    @Alias("ville.id")
    ville: number;
    @Map()
    @Alias("civilite.id")
    civilite: number;
    @Map()
    @Alias("nationalite.id")
    nationalite: number;
    @Map()
    @Alias("photo.id")
    photo: number;
    @Map()
    isClient: boolean;
    @Map()
    isVIP: boolean;
    @Map()
    nom: string;
    @Map()
    prenom: string;
    @Map()
    nomLocal: string;
    @Map()
    prenomLocal: string;
    @Map()
    dateNaissance: Date;
    @Map()
    organisme: string;
    @Map()
    fonction: string;
    @Map()
    proTelFixe: string;
    @Map()
    proTelPort: string;
    @Map()
    proCourriel: string;
    @Map()
    proFax: string;
    @Map()
    proAdrRue: string;
    @Map()
    proAdrCP: string;
    @Map()
    assistNom: string;
    @Map()
    assistPrenom: string;
    @Map()
    assistTel: string;
    @Map()
    assistCourriel: string;
    @Map()
    commentaire: string;
    @Map()
    satisfaction: string | string[];
    @Map()
    dateCreat: string;
    @Map()
    dateModif: string;
    @Map()
    listeProduit: Array<ProduitPartenaireDTO>;
}

export let PartenaireModel: Sequelize.DefineAttributes = {
    id: {
        type: Sequelize.INTEGER,
        field: "id_partenaire",
        autoIncrement: true,
        primaryKey: true
    },
    ville: {
        type: Sequelize.INTEGER,
        field: "id_ville",
        allowNull: false,
        references: {
            model: "VilleModel",
            key: "id"
        }
    },
    civilite: {
        type: Sequelize.INTEGER,
        field: "id_civilite",
        allowNull: false,
        references: {
            model: "CiviliteModel",
            key: "id"
        }
    },
    nationalite: {
        type: Sequelize.INTEGER,
        field: "id_pays",
        allowNull: false,
        references: {
            model: "PaysModel",
            key: "id"
        }
    },
    photo: {
        type: Sequelize.INTEGER,
        field: "id_photo",
        references: {
            model: "PhotoModel",
            key: "id"
        }
    },
    isClient: {
        type: Sequelize.BOOLEAN,
        field: "par_is_client"
    },
    isVIP: {
        type: Sequelize.BOOLEAN,
        field: "par_is_vip"
    },
    nom: {
        type: Sequelize.STRING(50),
        field: "par_nom"
    },
    prenom: {
        type: Sequelize.STRING(50),
        field: "par_prenom"
    },
    nomLocal: {
        type: Sequelize.STRING(50),
        field: "par_nom_local"
    },
    prenomLocal: {
        type: Sequelize.STRING(50),
        field: "par_prenom_local"
    },
    dateNaissance: {
        type: Sequelize.DATE,
        field: "par_date_naissance"
    },
    organisme: {
        type: Sequelize.STRING(50),
        field: "par_organisme"
    },
    fonction: {
        type: Sequelize.STRING(50),
        field: "par_fonction"
    },
    proTelFixe: {
        type: Sequelize.STRING(16),
        field: "par_pro_tel_fixe"
    },
    proTelPort: {
        type: Sequelize.STRING(16),
        field: "par_pro_tel_port"
    },
    proCourriel: {
        type: Sequelize.STRING(80),
        field: "par_pro_courriel"
    },
    proFax: {
        type: Sequelize.STRING(16),
        field: "par_pro_fax"
    },
    proAdrRue: {
        type: Sequelize.STRING(250),
        field: "par_pro_adr_rue"
    },
    proAdrCP: {
        type: Sequelize.STRING(9),
        field: "par_pro_adr_cp"
    },
    assistNom: {
        type: Sequelize.STRING(50),
        field: "par_assist_nom"
    },
    assistPrenom: {
        type: Sequelize.STRING(50),
        field: "par_assist_prenom"
    },
    assistTel: {
        type: Sequelize.STRING(16),
        field: "par_assist_tel"
    },
    assistCourriel: {
        type: Sequelize.STRING(80),
        field: "par_assist_courriel"
    },
    commentaire: {
        type: Sequelize.STRING(500),
        field: "par_commentaire"
    },
    satisfaction: {
        type: Sequelize.STRING(500),
        field: "satisfaction"
    },
    dateCreat: {
        type: Sequelize.DATE,
        field: "par_date_creation"
    },
    dateModif: {
        type: Sequelize.DATEONLY,
        field: "par_date_modification"
    }
};
