import Bean from "hornet-js-bean/src/decorators/Bean";
import Map from "hornet-js-bean/src/decorators/Map";
import Alias from "hornet-js-bean/src/decorators/Alias";

@Bean
export class PhotoMetier {
    @Map()
    id: number;
    @Map()
    fileName: string;
    @Map()
    @Alias("mimetype")
    mimeType: string;
    @Map()
    encoding: string;
    @Map()
    size: number;
    @Map()
    @Alias("contenu")
    data: Buffer;
}
