import { IValidationResult, ICustomValidation } from "hornet-js-core/src/validation/data-validator";
import ErrorObject = ajv.ErrorObject;

/**
 * Exemple de validation personnalisée pour les critères de recherche de partenaires
 */
export class ParRpaValidateIsVipEndDate implements ICustomValidation {

    /**
     * Vérifie que la date de fin est renseignée lorsque le critère VIP est coché.
     * @param data données de formulaire
     * @returns {{valid: boolean, errors: Array<ErrorObject>}}
     */
    validate(data: any): IValidationResult {
        let errors: Array<ErrorObject> = [];
        let valid: boolean = true;

        if (data.criteres.endDate && data.criteres.startDate && data.criteres.startDate > data.criteres.endDate) {
            errors.push({
                dataPath: ".criteres.endDate",
                keyword: "isLowerStartDate",
                schemaPath: "/",
                params: {}
            });
            valid = false;
        }
        if (data.criteres && data.criteres.partenaire) {
            if (data.criteres.partenaire.isVIP && !data.criteres.endDate) {

                errors.push({
                    dataPath: ".criteres.endDate",
                    keyword: "isVipIsEndDate",
                    schemaPath: "/",
                    params: {}
                });
                valid = false;
            }
        }

        return {
            valid: valid,
            errors: errors
        };
    }
}
