import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as React from "react";
import { HornetPage, HornetPageProps } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Tabs, TabsProps } from "hornet-js-react-components/src/widget/tab/tabs";
import { Tab } from "hornet-js-react-components/src/widget/tab/tab";
import { TabHeader } from "hornet-js-react-components/src/widget/tab/tab-header";
import { TabContent } from "hornet-js-react-components/src/widget/tab/tab-content";
import { URL_PARTENAIRES } from "src/utils/urls";
import { NotificationManager, Notifications } from "hornet-js-core/src/notification/notification-manager";
import { PaysMetier } from "src/models/ref/ref-pay-mod";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { DataSourceConfigPage } from "hornet-js-core/src/component/datasource/config/service/datasource-config-page";
import { FichePartenaireResult } from "src/services/type/par/par-fpa-res";
import { FichePartenairePageService } from "src/services/page/par/par-fpa-service";
import { SecteursTab } from "src/views/par/par-fpa/secteurs-tab";
import { ProduitMetier } from "src/models/pro/pro-mod";
import { ProduitsTab } from "src/views/par/par-fpa/produits-tab";
import { IdentiteTab, IdentiteTabDatasourcesService } from "src/views/par/par-fpa/identite-tab";
import { FichePartenaireTitrePage } from "src/views/par/par-fpa/fiche-partenaire-titre-page";
import { PartenaireMetier } from "src/models/par/par-mod";

const logger: Logger = Utils.getLogger("applitutoriel.views.par.par-fpa.fiche-partenaire-page");

export const PAR_MODE_CONSULTER: string = "consulter";
export const PAR_MODE_EDITER: string = "editer";
export const PAR_MODE_CREER: string = "creer";

/**
 * Ecran de détail de partenaire en lecture ou en édition
 */
export class FichePartenairePage extends HornetPage<FichePartenairePageService, HornetPageProps, any> {

    private fichePartenaireTitre: FichePartenaireTitrePage;
    private tabs: Tabs<TabsProps>;
    private identiteTab: IdentiteTab;

    private dataSourceNationalite: DataSource<PaysMetier>;
    private dataSourceProduits: PaginateDataSource<any>;
    private dataSourceSecteurs: DataSource<any>;

    private countNewTab: number = 1;

    constructor(props?: HornetComponentProps, context?: any) {
        super(props, context);

        this.dataSourceNationalite = new DataSource<PaysMetier>(new DataSourceConfigPage(this, this.getService().rechercherNationalites), {
            value: "id",
            text: "nationalite"
        });

        this.dataSourceProduits = new PaginateDataSource<any>([], {
            pageIndex: 0,
            itemsPerPage: 10,
            totalItems: 0
        }, {});

        this.dataSourceSecteurs = new DataSource<any>(new DataSourceConfigPage(this, this.getService().listerSecteurs));
    }

    updateClient() {
        if (this.attributes.mode === PAR_MODE_CREER) {
            this.identiteTab.setPartenaire(new PartenaireMetier());
        } else {
            this.getService().fichePartenaire(this.attributes.id).then((result: FichePartenaireResult) => {
                let products = [];
                if (result.partenaire) {
                    this.identiteTab.setPartenaire(result.partenaire);
                    products = result.partenaire.listeProduit;
                    /* MaJ du titre de la page avec le nom et prénom */
                    this.fichePartenaireTitre.setState({
                        title: this.i18n("partenaireFichePage.titre", {
                            "nom": Utils.getValueObject(result.partenaire, "nom"),
                            "prenom": Utils.getValueObject(result.partenaire, "prenom")
                        })
                    });
                }

                /*maj tableau de produits*/
                if (!products ||  Array.isArray(products) && products.length == 0) {
                    products = [];
                    for (let i: number = 1; i < 50; i++) {
                        products.push({nom: "dummy" + i, desc: "dummyDesc" + i} as ProduitMetier);
                    }
                }
                this.dataSourceNationalite.init(null);
                this.dataSourceProduits.deleteAll();
                this.dataSourceProduits.add(true, products);
                this.identiteTab.handleIsVIPChange();
            });
        }
    }

    /** @inheritDoc */
    prepareClient(): void {

        let p: Promise<any>;

        if (this.attributes.mode !== PAR_MODE_CREER) {
            p = this.getService().fichePartenaire(this.attributes.id);
        } else {
            p = this.getService().getFormData();
        }
        p.then((result: FichePartenaireResult) => {
            let products = [];
            if (result.partenaire) {
                this.identiteTab.setPartenaire(result.partenaire);
                products = result.partenaire.listeProduit;
                /* MaJ du titre de la page avec le nom et prénom */
                this.fichePartenaireTitre.setState({
                    title: this.i18n("partenaireFichePage.titre", {
                        "nom": Utils.getValueObject(result.partenaire, "nom"),
                        "prenom": Utils.getValueObject(result.partenaire, "prenom")
                    })
                });
            }

            /*maj tableau de produits*/
            if (!products || Array.isArray(products) && products.length == 0) {
                products = [];
                for (let i: number = 1; i < 50; i++) {
                    products.push({nom: "dummy" + i, desc: "dummyDesc" + i} as ProduitMetier);
                }
            }
            this.dataSourceNationalite.init(null);
            this.dataSourceProduits.add(true, products);

            this.identiteTab.setPays(result.pays);
            this.identiteTab.setVilles(result.villes);
            this.identiteTab.handleIsVIPChange();

        });
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("FichePartenairePage render");
        return (
            <div>
                <FichePartenaireTitrePage ref={(page) => {
                    this.fichePartenaireTitre = page
                }} title={this.i18n("partenaireFichePage.titre", {
                    nom: "",
                    prenom: ""
                }) + this.i18n("partenaireFichePage.suffixeCreation")}/>
                <br/>

                <Tabs ref={(tabs) => {
                    this.tabs = tabs
                }} id="tabsPartenaire" selectedTabIndex={0}>
                    <Tab id="tab1" onSelect={this.onSelect}
                         title={this.i18n("partenaireFichePage.ongletIdentiteTitre")}>
                        <IdentiteTab
                            ref={(tab) => {
                                this.identiteTab = tab
                            }}
                            dataSourcesService={new IdentiteTabDatasourcesService(this.dataSourceNationalite)}
                            onSubmit={this.onSubmit}
                            onCancel={this.onCancel}
                            pageAttributes={{
                                id: this.attributes.id,
                                mode: this.attributes.mode,
                                isVIP: ((this.props.navigateData && this.props.navigateData.isVIP) || false)
                            }}/>
                    </Tab>
                    <Tab id="tab2" title={this.i18n("partenaireFichePage.ongletListeProduitTitre")}
                         onSelect={this.onSelect}>
                        <ProduitsTab dataSource={this.dataSourceProduits}/>
                    </Tab>

                    <Tab id="tab3" title={this.i18n("partenaireFichePage.ongletListeSecteursTitre")}
                         mount={false}
                         onSelect={this.onSelect}
                         onClick={this.loadAsyncTab}>
                        <SecteursTab dataSource={this.dataSourceSecteurs}/>
                    </Tab>
                    {this.attributes.mode != "consulter" ?
                        <Tab id="tab4"
                             mount={false}
                             onClick={this.addTab}
                        >

                            <TabHeader>
                                <a href={"#"} title={"Ajouter un onglet 'Produit'"} onClick={this.addTab}>+</a>
                            </TabHeader>
                        </Tab> : <div/>}
                </Tabs>
            </div>
        );
    }


    /**
     * Sélection des tabs
     */
    onSelect(Tab, flag) {
        if (flag) {
            logger.trace("j'arrive sur l'onglet : ", Tab);
        } else {
            logger.trace("je quitte l'onglet : ", Tab);
        }
    }

    /**
     * Ajouter des onglets dynamiquement
     */
    addTab() {
        if (!this.countNewTab) {
            this.countNewTab = 0;
        }

        let index = "newSecteurTab" + this.countNewTab;
        let cb: any = (e: Element): void => {
            let tabInserted = this.tabs.getTabById(index);
            if (tabInserted && tabInserted.props && tabInserted.props.index) {
                this.tabs.showPanel(tabInserted.props.index);
            }
        };

        this.tabs.addElements(1, <Tab id={index}>
            <TabHeader>
                <div className={"onglet-secteur-header-title"}>{"New Produits " + this.countNewTab}</div>
                <div className={"onglet-secteur-header-action"}>
                    <a href={"#"} title={"Suppression de l'onglet 'Produit " + this.countNewTab + "'"}
                       onClick={this.removeTab}>X</a>
                </div>
            </TabHeader>
            <TabContent>
                <ProduitsTab dataSource={this.dataSourceProduits}/>
            </TabContent>
        </Tab>, cb);

        this.countNewTab++;
    }

    removeTab() {
        let tab = this.tabs.getTabByIndex(this.tabs.getCurrentIndexSelected());

        if (tab && tab.props && tab.props.id) {
            this.tabs.removeElementsById(tab.props.id);
        }

        this.countNewTab--;
    }

    /**
     * Supprimer les onglets créés dynamiquement
     */
    delTabs(): void {
        let listIds: string[] = [];
        for (let i = 1; i <= this.countNewTab; i++) {
            listIds.push("newSecteurTab" + i);
            listIds.push("newProduitTab" + i);
        }
        this.tabs.removeElementsById(...listIds);
        this.countNewTab = 0;
    }

    /**
     * Méthode de chargement de l'onglet asynchrone
     * @param tab
     * @param header
     * @param index
     */
    loadAsyncTab(tab, header, index) {
        logger.debug("loadAsyncTab");
        if (!this.dataSourceSecteurs.status) {
            this.dataSourceSecteurs.init();
        }
    }

    /**
     * Méthode de Navigation exécutée lors de la soumission du formulaire du Tab1
     * @param partenaireData
     */
    private onSubmit(partenaireData: any): void {
        logger.trace("Submit du formulaire fiche partenaire");
        if (this.attributes.mode == PAR_MODE_CREER || this.attributes.mode == PAR_MODE_EDITER) {
            this.getService().modifier(this.attributes.id, partenaireData, (event) => {
                logger.trace(event);
            }).then(() => {
                let notifText: string = (this.i18n("info.message.IN-PA-FPA-01") as string)
                    .replace("{nom}", partenaireData.nom)
                    .replace("{prenom}", partenaireData.prenom);
                logger.trace("Retour écran de recherche de partenaires");

                let criteres = (this.props.navigateData && this.props.navigateData.criteres) ? this.props.navigateData.criteres : {};
                let dataSource = (this.props.navigateData && this.props.navigateData.dataSource) ? this.props.navigateData.dataSource : null;
                if (dataSource != null) {
                    this.navigateTo(URL_PARTENAIRES, {
                        criteres: criteres,
                        dataSource: dataSource,
                        forceReload: true
                    }, () => {
                        NotificationManager.notify(null, null, Notifications.makeSingleNotification("PARTENAIRE_SAVED", notifText));
                    });
                } else {
                    this.navigateTo(URL_PARTENAIRES, {criteres: criteres}, () => {
                        NotificationManager.notify(null, null, Notifications.makeSingleNotification("PARTENAIRE_SAVED", notifText));
                    });
                }

            });
        }
    }

    /**
     * méthode de Navigation exécutée lors du clic sur le bouton Annuler Tab1
     */
    private onCancel(): void {
        let criteres = (this.props.navigateData && this.props.navigateData.criteres) ? this.props.navigateData.criteres : {};
        let dataSource = (this.props.navigateData && this.props.navigateData.dataSource) ? this.props.navigateData.dataSource : {};

        let url = "/partenaires";
        this.navigateTo(url, {criteres: criteres, dataSource: dataSource}, null);
    }

}