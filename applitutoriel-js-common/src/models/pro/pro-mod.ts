import { SecteurMetier } from "src/models/adm/sec-mod";

import Bean from "hornet-js-bean/src/decorators/Bean";
import Map from "hornet-js-bean/src/decorators/Map";

@Bean
export class ProduitMetier {
    @Map()
    id: number;
    @Map()
    nom: string;
    @Map()
    desc: string;
    secteur: SecteurMetier;
}
