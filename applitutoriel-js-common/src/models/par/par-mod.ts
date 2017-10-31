import { PaysMetier } from "src/models/ref/ref-pay-mod";
import { VilleMetier } from "src/models/ref/ref-ville-mod";
import { CiviliteMetier } from "src/models/ref/ref-civilite-mod";
import { PhotoMetier } from "src/models/photo-mod";
import Bean from "hornet-js-bean/src/decorators/Bean";
import Map from "hornet-js-bean/src/decorators/Map";
import Alias from "hornet-js-bean/src/decorators/Alias";
import { ProduitMetier } from "src/models/pro/pro-mod";

@Bean
export class Satisfaction {
    @Map()
    ids: string[];
}

@Bean
export class PartenaireMetier {
    @Map()
    id: number;

    @Map(VilleMetier)
    @Alias("laVille")
    ville: VilleMetier;

    @Map(CiviliteMetier)
    @Alias("laCivilite")
    civilite: CiviliteMetier;

    @Map(PaysMetier)
    @Alias("laNationalite")
    nationalite: PaysMetier;

    @Map(PhotoMetier)
    @Alias("laPhoto")
    photo: PhotoMetier;

    @Map(ProduitMetier)
    @Alias("listeProduit")
    listeProduit: Array<ProduitMetier>;

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
    satisfaction: Satisfaction | string;

    @Map()
    dateCreat: Date;

    @Map()
    dateModif: Date;

    @Map()
    proAutresTels: String[];
}
