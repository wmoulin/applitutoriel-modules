/**
 * Contient les informations relatives à un pays
 */
import Bean from "hornet-js-bean/src/decorators/Bean";
import Map from "hornet-js-bean/src/decorators/Map";

export type Pays = {
    /** Identifiant du pays */
    id: number,

    /** Libellé du pays */
    libelle: string,

    /** Libellé de la nationalité */
    nationalite: string
};

@Bean
export class PaysMetier {
    @Map()
    id: number;
    @Map()
    libelle: string;
    @Map()
    nationalite: string;
}
