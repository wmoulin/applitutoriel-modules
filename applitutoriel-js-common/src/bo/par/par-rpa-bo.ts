import { UploadedFile } from "hornet-js-core/src/data/file";

export class Partenaire {
    id: number;
    civilite: { id: string };
    pays: { id: string };
    ville: { id: string };
    nationalite: { id: string };
    isClient: boolean;
    isVIP: boolean;
    photo: UploadedFile;
}
