import { Pays, PaysMetier } from "src/models/ref/ref-pay-mod";
import Bean from "hornet-js-bean/src/decorators/Bean";
import Map from "hornet-js-bean/src/decorators/Map";
import Alias from "hornet-js-bean/src/decorators/Alias";

export type Ville = {
    id: number
    libelle: string
    pays: Pays
};

@Bean
export class VilleMetier {
    @Map()
    id: number;
    @Map()
    libelle: string;

    @Map(PaysMetier)
    @Alias("lePays")
    pays: PaysMetier;
}
