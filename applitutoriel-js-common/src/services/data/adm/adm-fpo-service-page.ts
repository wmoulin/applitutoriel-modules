/**
 * Interface des services pour les produits
 * @interface
 */
export abstract class FicheProduitService {
    /**
     * liste les produits
     * @return Promise
     */
    abstract listerProduits(): Promise<any>;

    /**
     * donne la répartition des produits par secteur
     * @return Promise
     */
    abstract repartition(): Promise<any>;
}
