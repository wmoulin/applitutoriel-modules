export interface ProduitService {

    /**
     * liste les produits
     * @return Promise
     */
    lister(): Promise<any>;
}
