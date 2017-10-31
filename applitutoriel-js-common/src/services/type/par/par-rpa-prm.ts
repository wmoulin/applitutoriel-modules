import { Pagination } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { FormRecherchePartenaire } from "src/services/type/par/par-types";
import { SortData } from "hornet-js-core/src/component/sort-data";

/**
 * Données à fournir au service de recherche de partenaires
 */
export interface PartenaireRechercheParameter {
    /** Paramètres de pagination */
    pagination?: Pagination;

    /** Critères de recherche */
    criteres: FormRecherchePartenaire;

    /** Paramètres de tri */
    sort?: SortData;
}
