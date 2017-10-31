import Bean from "hornet-js-bean/src/decorators/Bean";
import Map from "hornet-js-bean/src/decorators/Map";

@Bean
export class CiviliteMetier {
    @Map()
    id: number;
    @Map()
    libelle: string;
}
