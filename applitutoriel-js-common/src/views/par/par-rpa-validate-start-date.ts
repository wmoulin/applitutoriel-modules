import { IValidationResult, ICustomValidation } from "hornet-js-core/src/validation/data-validator";
import ErrorObject = ajv.ErrorObject;
import { Utils } from "hornet-js-utils";
import { DateDiffUnit } from "hornet-js-utils/src/date-utils";

/**
 * Exemple de validation personnalisée pour les critères de recherche de partenaires
 */
export class ParRpaValidateSectorStartDate implements ICustomValidation {

    /**
     * Vérifie que la date de début est inférieure au 01/01/2001 lorsque lorsqu'un secteur est sélectionné
     * @param data données de formulaire
     * @returns {{valid: boolean, errors: Array<ErrorObject>}}
     */
    validate(data: any): IValidationResult {
        let errors: Array<ErrorObject> = [];
        let valid: boolean = true;
        if (data.criteres != null && data.criteres.idSecteur != null && data.criteres.startDate != null) {
            const startTime: number = Date.parse(data.criteres.startDate);
            const minStartTime: number = Date.UTC(2001, 0, 1);
            if (!isNaN(startTime) && startTime > minStartTime) {

                errors.push({
                    dataPath: "criteres.startDate",
                    keyword: "sectorStartDate",
                    schemaPath: "/",
                    params: {}
                });
                valid = false;
            }
            if (data.criteres.endDate) {
                const startTime: Date = new Date(data.criteres.startDate);
                const endTime: Date = new Date(data.criteres.endDate);
                let diff = Utils.dateUtils.diff(startTime, endTime, DateDiffUnit.DAYS);
                if (diff.days <= 2) {
                    errors.push({
                        dataPath: "criteres.startDate",
                        keyword: "sectorBetweenDate",
                        schemaPath: "/",
                        params: {linkedFieldsName: ["criteres.endDate"]}
                    });
                    valid = false;
                }
            }
        }

        return {
            valid: valid,
            errors: errors
        };
    }
}
