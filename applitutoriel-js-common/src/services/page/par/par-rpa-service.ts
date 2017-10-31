import { PartenaireRechercheParameter } from "src/services/type/par/par-rpa-prm";
import { MediaType } from "hornet-js-core/src/protocol/media-type";
import { PartenaireResult } from "src/services/type/par/par-types";
import { ServiceRequest } from "hornet-js-core/src/services/service-request";

/**
 * Interface des services pour les partenaires
 * @interface
 */
export abstract class RecherchePartenaireService extends ServiceRequest {

    abstract rechercher(criteres: PartenaireRechercheParameter, reqMimeType: MediaType, res?: NodeJS.WritableStream): Promise<any>;

    abstract supprimer(id): Promise<any>;

    abstract supprimerPage(id): Promise<any>;

    abstract supprimerEnMasse(partenaires: PartenaireResult[]): Promise<any>;

    abstract exporter(reqMimeType: MediaType, criteres?: PartenaireRechercheParameter): Promise<any>;

    abstract exporterODF(reqMimeType: MediaType, criteres?: PartenaireRechercheParameter): Promise<any>;

    abstract listerSecteurs(): Promise<any>;
}
