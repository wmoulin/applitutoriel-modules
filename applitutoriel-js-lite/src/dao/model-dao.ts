import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { VilleAttributes, VilleModel } from "src/models/ref/ref-ville-mod";
import { PaysAttributes, PaysModel } from "src/models/ref/ref-pay-mod";
import { SecteurAttributes, SecteurModel } from "src/models/adm/seq-sec-mod";
import { ProduitAttributes, ProduitModel } from "src/models/pro/model-produit";
import { CiviliteAttributes, CiviliteModel } from "src/models/ref/ref-civilite-mod";
import { UtilisateurAttributes, UtilisateurModel } from "src/models/seq-user-mod";
import { PartenaireAttributes, PartenaireModel } from "src/models/par/seq-par-mod";
import { ProduitPartenaireAttributes, ProduitPartenaireModel } from "src/models/par/seq-pro-par-mod";
import { PhotoAttributes, PhotoModel } from "src/models/seq-photo-model";
import { RoleAttributes, RoleModel } from "src/models/model-role";
import { RoleUtilisateurAttributes, RoleUtilisateurModel } from "src/models/model-role_utilisateur";
import { Entity } from "hornet-js-database/src/decorators/dec-seq-entity";
import { SequelizeUtils } from "hornet-js-database/src/sequelize/sequelize-utils";
import { injectable, Scope, Side } from "hornet-js-core/src/inject/injectable";
import { HornetSequelizeModel } from "hornet-js-database/src/sequelize/hornet-sequelize-model";
import { inject } from "hornet-js-core/src/inject/inject";
import { HornetSequelizeInstanceModel } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";

const logger: Logger = Utils.getLogger("applitutoriel.src.dao.model-dao");

@injectable(ModelDAO, Scope.SINGLETON, Side.SERVER)
export class ModelDAO extends HornetSequelizeModel {

    @Entity("ville", VilleModel)
    public villeEntity: HornetSequelizeInstanceModel<VilleAttributes>;

    @Entity("pays", PaysModel)
    public paysEntity: HornetSequelizeInstanceModel<PaysAttributes>;

    @Entity("civilite", CiviliteModel)
    public civiliteEntity: HornetSequelizeInstanceModel<CiviliteAttributes>;

    @Entity("produit", ProduitModel)
    public produitEntity: HornetSequelizeInstanceModel<ProduitAttributes>;

    @Entity("secteur", SecteurModel)
    public secteurEntity: HornetSequelizeInstanceModel<SecteurAttributes>;

    @Entity("utilisateur", UtilisateurModel)
    public utilisateurEntity: HornetSequelizeInstanceModel<UtilisateurAttributes>;

    @Entity("role", RoleModel)
    public roleEntity: HornetSequelizeInstanceModel<RoleAttributes>;

    @Entity("role_utilisateur", RoleUtilisateurModel)
    public roleUtilisateurEntity: HornetSequelizeInstanceModel<RoleUtilisateurAttributes>;

    @Entity("partenaire", PartenaireModel)
    public partenaireEntity: HornetSequelizeInstanceModel<PartenaireAttributes>;

    @Entity("produit_partenaire", ProduitPartenaireModel)
    public produitPartenaireEntity: HornetSequelizeInstanceModel<ProduitPartenaireAttributes>;

    @Entity("photo", PhotoModel)
    public photoEntity: HornetSequelizeInstanceModel<PhotoAttributes>;

    constructor(@inject("configApplitutoDatabase")conf?: string) {
        super(conf);
        this.initVilleEntity();
        this.initUtilisateurEntity();
        this.initRoleEntity();
        this.initPartenaireEntity();
        this.initProduitEntity();
    }

    /** METHODS */

    private initVilleEntity(): void {
        SequelizeUtils.initRelationBelongsTo(this.villeEntity, this.paysEntity, "lePays", "id_pays");
    }

    private initUtilisateurEntity(): void {
        SequelizeUtils.initRelationBelongsToMany(this.utilisateurEntity, this.roleEntity, "listeRole", "id_utilisateur", "role_utilisateur");
    }

    private initRoleEntity(): void {
        SequelizeUtils.initRelationBelongsToMany(this.roleEntity, this.utilisateurEntity, "listeUser", "id_role", "role_utilisateur");
    }

    private initPartenaireEntity(): void {
        SequelizeUtils.initRelationBelongsTo(this.partenaireEntity, this.paysEntity, "laNationalite", "id_pays");
        SequelizeUtils.initRelationBelongsTo(this.partenaireEntity, this.villeEntity, "laVille", "id_ville");
        SequelizeUtils.initRelationBelongsTo(this.partenaireEntity, this.civiliteEntity, "laCivilite", "id_civilite");
        SequelizeUtils.initRelationBelongsToMany(this.partenaireEntity, this.produitEntity, "listeProduit", "id_partenaire", "produit_partenaire");
        SequelizeUtils.initRelationBelongsTo(this.partenaireEntity, this.photoEntity, "laPhoto", "id_photo");
    }

    private initProduitEntity(): void {
        SequelizeUtils.initRelationBelongsToMany(this.produitEntity, this.partenaireEntity, "partenaires", "id_produit", "produit_partenaire");
    }
}