import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";

import * as _ from "lodash";
import { PartenaireService } from "src/services/data/par/partenaire-service";
import { MediaType, MediaTypes } from "hornet-js-core/src/protocol/media-type";
import { ParRpaValidateIsVipEndDate } from "src/views/par/par-rpa-validate-end-date";
import { DataValidator } from "hornet-js-core/src/validation/data-validator";
import { ParRpaValidateSectorStartDate } from "src/views/par/par-rpa-validate-start-date";
import { PartenaireResult } from "src/services/type/par/par-types";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { BusinessErrorList } from "hornet-js-utils/src/exception/business-error-list";
import { TechnicalError } from "hornet-js-utils/src/exception/technical-error";
import { ITEMS_PER_PAGE_ALL, Pagination } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { RouteActionService } from "hornet-js-core/src/routes/abstract-routes";
import { ResultFile } from "hornet-js-core/src/result/result-file";
import { ResultCSV } from "hornet-js-core/src/result/result-csv";
import { ResultPDF } from "hornet-js-core/src/result/result-pdf";
import { ResultStream } from "hornet-js-core/src/result/result-stream";
import { OptionsCSV, OptionsOpenDocument, OptionsPDF } from "hornet-js-core/src/result/hornet-result-interface";
import { DateUtils } from "hornet-js-utils/src/date-utils";
import { ResultODT } from "hornet-js-core/src/result/result-odt";
import { ResultODS } from "hornet-js-core/src/result/result-ods";

import * as path from "path";

import * as rpaValidationSchema from "src/views/par/par-rpa-validation.json";
const logger: Logger = Utils.getLogger("applitutoriel.actions.par.par-rpa-actions");

/**
 * Action de recherche de partenaires répondant aux critères indiqués
 */
export class Rechercher extends RouteActionService<any, PartenaireService> {

    /**
     * Renvoie l'objet contenant les éléments nécessaires à la validation des critères de recherche.
     * @override
     */
    getDataValidator(): DataValidator {
        return new DataValidator(rpaValidationSchema, [new ParRpaValidateIsVipEndDate(), new ParRpaValidateSectorStartDate()]);
    }

    execute(): Promise<any> {

        logger.trace("ACTION Rechercher.PartenairesRouteAction");
        logger.trace("Partenaire Action Rechercher, criterias:", this.req.body);

        if (this.req.body) {
            let payload: any = this.getPayload();

            if (!payload) {
                logger.warn("Recherche non valide : Accès direct");
                Promise.resolve(true);
            }

            logger.debug("Partenaire Action Rechercher, criteres to send :", payload);

            return this.getService().rechercher(payload, this.getMediaType());
        } else {
            Promise.resolve(true);
        }
    }
}

/**
 * Suppression d'un partenaire ayant l'identifiant indiqué
 */
export class SupprimerPartenaire extends RouteActionService<{ id: string }, PartenaireService> {

    execute(): Promise<any> {
        logger.trace("ACTION SupprimerPartenaire id=", this.attributes.id);
        return this.getService().supprimer(this.attributes.id);
    }
}

/**
 * Suppression plusieurs partenaires en une seule action
 */
export class SupprimerEnMasse extends RouteActionService<{ id: string }, PartenaireService> {

    execute(): Promise<any> {
        logger.trace("ACTION SupprimerEnMasse.PartenairesRouteAction");
        logger.debug("Suppression des partenaires :", this.req.body);
        if (this.req.body) {
            let partenairesNotVip: PartenaireResult[] = [];
            // Contrôle IsVip
            this.req.body.map((item: PartenaireResult) => {
                if (!item.isVIP) {
                    partenairesNotVip.push(item);
                }
            });

            logger.debug("partenairesNotVip :", partenairesNotVip);
            if (partenairesNotVip.length > 0) {

                return this.getService().supprimerEnMasse(partenairesNotVip).catch((error: any) => {
                    if (error instanceof TechnicalError) {
                        /* En cas d'erreur technique on utilise le traitement standard */
                        throw error;
                    }
                    let ids: number[] = [];
                    if (error instanceof BusinessErrorList) {
                        /* En cas d'erreurs métier, plusieurs partenaires ont pu cependant être supprimés avec succès.
                         * Ceux qui ne sont pas retournés dans la liste ids seront notifiés en erreur. */
                        let errors: BusinessError[] = (error as BusinessErrorList).getErrors();
                        errors.forEach((error: BusinessError) => {
                            if (error.code == "IN-PA-RPA-01") {
                                ids.push(parseInt(error.args["$2"]));
                            }
                        });
                    }
                    return Promise.reject(ids);
                });
            } else {
                return Promise.resolve(true);
            }
        } else {
            return Promise.resolve(true);
        }
    }
}

export class Export extends RouteActionService<{ mediaType: string }, PartenaireService> {
    execute(): Promise<ResultStream | ResultFile> {
        logger.trace("ACTION Export.PartenairesRouteAction");
        logger.debug("Partenaire Action Export - récupération des criteres de recherche dans la session");

        let criteres: any = this.getPayload() && this.getPayload().criteres;

        if (criteres) {
            logger.debug("Critères trouvés dans la session ", criteres);
            let mediaType: MediaType = this.getMediaType();

            logger.debug("MIMETYPE :", mediaType.MIME);

            // Pour l'export on force à avoir tous les items dans la recherche
            let payload: any = _.assign({}, {
                criteres: criteres,
                pagination: {pageIndex: 0, itemsPerPage: ITEMS_PER_PAGE_ALL} as Pagination
            });
            return this.getService().rechercher(payload, mediaType, this.res).then((retourApi) => {
                return new ResultStream(retourApi, retourApi.mimeType);
            });
        }
    }
}

export class ExportLite extends RouteActionService<any, PartenaireService> {
    execute(): Promise<ResultFile> {
        logger.trace("ACTION Export.PartenairesRouteAction");
        logger.debug("Partenaire Action Export - récupération des criteres de recherche dans la session");

        let criteres: any = this.getPayload() && this.getPayload().criteres;

        if (criteres) {
            logger.debug("Critères trouvés dans la session ", criteres);
            let mediaType: MediaType = this.getMediaType() as MediaType;
            let originalMediaType: MediaType = this.getMediaType() as MediaType;

            logger.debug("MIMETYPE :", mediaType.MIME);

            // Pour l'export on force à avoir tous les items dans la recherche
            let payload: any = {
                criteres: criteres,
                pagination: {pageIndex: 0, itemsPerPage: ITEMS_PER_PAGE_ALL} as Pagination
            };

            let ODT = MediaTypes.ODT;
            let ODS = MediaTypes.ODS;
            let CSV = MediaTypes.CSV;
            let PDF = MediaTypes.PDF;
            return this.getService().rechercher(payload, MediaTypes.JSON).then((retourApi) => {
                let res: ResultFile;
                let dataOpenDocument = {
                    title: "Liste des partenaires",
                    tableLabel: "Recherche par date de début : " + DateUtils.formatInTZ(retourApi.listeCriteres.startDate, DateUtils.YMD_Formats[0]),
                    fieldNames: {
                        nom: "Nom",
                        prenom: "Prénom",
                        organisme: "Organisme",
                        proCourriel: "Courriel"
                    },
                    data: retourApi.liste
                };

                if (originalMediaType.SHORT == ODS.SHORT) {
                    res = new ResultODS({
                        data: dataOpenDocument,
                        templateFilePath: path.join(__dirname, "../../resources/templates/partenairesList.ods")
                    } as OptionsOpenDocument);
                } else if (originalMediaType.SHORT == ODT.SHORT) {
                    res = new ResultODT({
                        data: dataOpenDocument,
                        templateFilePath: path.join(__dirname, "../../resources/templates/partenairesList.odt")
                    } as OptionsOpenDocument);
                } else if (originalMediaType.SHORT == CSV.SHORT) {
                    res = new ResultCSV({
                        data: retourApi.liste,
                        fields: ["nom", "prenom", "organisme", "proCourriel"], filename: "customFileName." + CSV.SHORT
                    } as OptionsCSV);
                } else if (originalMediaType.SHORT == PDF.SHORT) {
                    res = new ResultPDF({
                        data: retourApi.liste,
                        fields: ["nom", "prenom", "organisme", "proCourriel"],
                        fieldNames: ["Nom", "Prénom", "Organisme", "Courriel"],
                        definition: {
                            pageSize: "A4",
                            content: [
                                {text: "Liste des partenaires", style: "subheader"},
                                {text: "Recherche par date de début : " + DateUtils.formatInTZ(retourApi.listeCriteres.startDate, DateUtils.YMD_Formats[0])},
                                {
                                    style: "tableExample",
                                    table: {headerRows: 2},
                                    layout: {
                                        fillColor: (i, node) => {
                                            return (i % 2 === 0) ? "#F3F6F8" : null;
                                        }
                                    }
                                }],
                            header: {
                                columns: [
                                    {
                                        alignment: "right",
                                        text: "" + DateUtils.formatInTZ(new Date(), DateUtils.YMD_Formats[0])
                                    }
                                ]
                            },
                            footer: (page, pages) => {
                                return {
                                    columns: [
                                        {
                                            alignment: "left",
                                            text: "footer left"
                                        }, {
                                            alignment: "right",
                                            text: [
                                                " Page ",
                                                {text: page.toString()},
                                                " sur ",
                                                {text: pages.toString()}
                                            ]
                                        }
                                    ],
                                    margin: [10, 0]
                                };
                            },
                            styles: {
                                tableExample: {
                                    margin: [2, 2, 2, 2]
                                },
                                tableHeader: {
                                    bold: true,
                                    fontSize: 13,
                                    fillColor: "#8FAFCC"
                                },
                                subheader: {
                                    margin: [20, 20, 20, 20],
                                    bold: true,
                                    fontSize: 25,
                                    alignment: "center"
                                }
                            }
                        }
                    } as OptionsPDF);
                } else {
                    res = null;
                }
                return res;
            });
        }
    }
}