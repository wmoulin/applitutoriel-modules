import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as React from "react";
import { HornetPage, HornetPageProps } from "hornet-js-react-components/src/widget/component/hornet-page";
import { Notification } from "hornet-js-react-components/src/widget/notification/notification";
import {
    NotificationManager,
    Notifications,
    NotificationType
} from "hornet-js-core/src/notification/notification-manager";
import { Form } from "hornet-js-react-components/src/widget/form/form";
import { Row } from "hornet-js-react-components/src/widget/form/row";
import { FieldSet } from "hornet-js-react-components/src/widget/form/fieldset";
import { RadiosField } from "hornet-js-react-components/src/widget/form/radios-field";
import { SelectField, SelectFieldProps } from "hornet-js-react-components/src/widget/form/select-field";
import { CheckBoxField } from "hornet-js-react-components/src/widget/form/checkbox-field";
import {
    CalendarField,
    CalendarFieldProps,
    CalendarFieldState
} from "hornet-js-react-components/src/widget/form/calendar-field";
import { ParRpaValidateIsVipEndDate } from "src/views/par/par-rpa-validate-end-date";
import { ParRpaValidateSectorStartDate } from "src/views/par/par-rpa-validate-start-date";
import { MediaType, MediaTypes } from "hornet-js-core/src/protocol/media-type";
import { PartenaireResult } from "src/services/type/par/par-types";
import { Button } from "hornet-js-react-components/src/widget/button/button";
import * as _ from "lodash";
import { RecherchePartenaireService } from "src/services/page/par/par-rpa-service";
import { AuthUtils } from "hornet-js-utils/src/authentication-utils";
import { Roles } from "src/utils/roles";

import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { PartenaireRechercheParameter } from "src/services/type/par/par-rpa-prm";

import { Table } from "hornet-js-react-components/src/widget/table/table";
import { Column } from "hornet-js-react-components/src/widget/table/column";
import { Columns } from "hornet-js-react-components/src/widget/table/columns";
import { CheckColumn } from "hornet-js-react-components/src/widget/table/column/check-column";
import { DateColumn } from "hornet-js-react-components/src/widget/table/column/date-column";
import { MenuActions } from "hornet-js-react-components/src/widget/table/menu-actions";
import { ActionButton, TypeAction } from "hornet-js-react-components/src/widget/table/action-button";
import { YesNoColumn } from "hornet-js-react-components/src/widget/table/column/yesno-column";
import { ToggleColumnsButton } from "hornet-js-react-components/src/widget/table/toggle-columns-button";
import { LineAfter } from "hornet-js-react-components/src/widget/table/line/line-after";

import { Header } from "hornet-js-react-components/src/widget/table/header";
import { Footer } from "hornet-js-react-components/src/widget/table/footer";
import { Content } from "hornet-js-react-components/src/widget/table/content";
import { Picto } from "hornet-js-react-components/src/img/picto";
import { Pager, PaginationProps } from "hornet-js-react-components/src/widget/pager/pager";
import { ActionColumn } from "hornet-js-react-components/src/widget/table/column/action-column";
import { MoreInfoColumn } from "hornet-js-react-components/src/widget/table/column/more-info-column";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { DataSourceConfigPage } from "hornet-js-core/src/component/datasource/config/service/datasource-config-page";
import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { ButtonsArea } from "hornet-js-react-components/src/widget/form/buttons-area";
import { DefaultSort } from "hornet-js-core/src/component/datasource/options/datasource-option";
import { SortData } from "hornet-js-core/src/component/sort-data";

import * as schema from "src/views/par/par-rpa-validation.json";

const logger: Logger = Utils.getLogger("applitutoriel.views.par.par-rpa-page");

/**
 * Page de recherche des partenaires. L'ajout ou la modification d'un partenaire se fait dans une fiche indépendante
 */
export class RecherchePartenairesPage extends HornetPage<RecherchePartenaireService, HornetPageProps, any> {

    private paginateDataSource: PaginateDataSource<any>;
    private dataSourceIsClient: DataSource<any>;

    private isTableVisible: boolean = false;

    // Composants
    /** Tableau de liste de partenaires */
    private maTable: Table;

    /** Composant Liste déroulante des secteurs */
    private secteurSelect: SelectField<SelectFieldProps>;

    /** Composant CheckBox isVip */
    private checkBoxIsVip: CheckBoxField;

    /** Liste permettant d'alimenter la liste déroulante des secteurs */
    private listeSecteurs = [ { nom: this.i18n("partenairesListePage.form.fields.criteres.idSecteur.tous") }];
    private dataSourceSecteurs: DataSource<any> = new DataSource([]);
    /** Formulaire de recherche */
    private formRecherche: Form;

    private criteresRecherche: any;

    private endDate: CalendarField<CalendarFieldProps, CalendarFieldState>;

    /** Valeurs par défaut du formulaire de recherche */
    private defaultValues = {
        criteres: {
            partenaire: {
                isClient: "true",
                isVIP: ""
            },
            idSecteur: "",
            startDate: new Date("2015-03-25"),
            endDate: ""
        }
    };

    /** Liste des types de client */
    private LISTE_IS_CLIENT: any[] = [
        {
            isClient: "true",
            libelle: this.i18n("partenairesListePage.form.fields.criteres.partenaire.isClient.clientLabel")
        },
        {
            isClient: "false",
            libelle: this.i18n("partenairesListePage.form.fields.criteres.partenaire.isClient.fournisseurLabel")

        }
    ];

    /** Objet des critères initiaux (provenant du CLS ou de la session dans le cas d'un F5) */
    private currentCriteres: any;

    constructor(props?: HornetPageProps, context?: any) {
        super(props, context);

        this.paginateDataSource = this.initDataSource(props);
        this.dataSourceIsClient = new DataSource(this.LISTE_IS_CLIENT, { value: "isClient", label: "libelle" });

        this.state.pagination = {
            pageIndex: 0,
            itemsPerPage: 10,
            totalItems: 0
        } as PaginationProps;

        /* Récupération des données provenant du CLS */
        let criteres;
        if (props.navigateData) {
            criteres = props.navigateData.criteres;
        }

        /* Valeurs par défaut du formulaire de recherche */
        this.currentCriteres = {
            partenaire: {
                isClient: _.get(criteres, "partenaire.isClient") != null ?
                    _.get(criteres, "partenaire.isClient") : _.get(this.defaultValues, "criteres.partenaire.isClient"),
                isVIP: _.get(criteres, "partenaire.isVIP") != null ?
                    _.get(criteres, "partenaire.isVIP") : _.get(this.defaultValues, "criteres.partenaire.isVIP")
            },
            idSecteur: (_.get(criteres, "idSecteur") != null) ?
                _.get(criteres, "idSecteur").toString() : _.get(this.defaultValues, "criteres.idSecteur"),
            startDate: _.get(criteres, "startDate") ?
                this.getDateFormatee(_.get(criteres, "startDate")) : _.get(this.defaultValues, "criteres.startDate"),
            endDate: _.get(criteres, "endDate") ?
                this.getDateFormatee(_.get(criteres, "endDate")) : _.get(this.defaultValues, "criteres.endDate")
        };
    }

    /**
     * Alimente le tableau de liste des partenaires
     * @override
     */
    prepareClient(): void {
        // Récupération de la liste des secteurs
        let self: RecherchePartenairesPage = this;

        this.getService().listerSecteurs().then((secteurs) => {
            // Alimentation de la liste déroulante des secteurs
            self.dataSourceSecteurs.add(true, this.listeSecteurs.concat(secteurs));
            // Valorisation des champs du formulaire de recherche
            self.secteurSelect.setCurrentValue(this.currentCriteres.idSecteur);
        });

        this.formRecherche.updateFields({ criteres: this.currentCriteres });

        if (this.currentCriteres.partenaire.isVIP) {
            this.checkBoxIsVip.setCurrentChecked(this.currentCriteres.partenaire.isVIP);
        }

        let formData: PartenaireRechercheParameter = { criteres: this.props.navigateData && this.props.navigateData.criteres };
        let forceReload: boolean = this.props.navigateData && this.props.navigateData.forceReload;
        if (formData.criteres) {
            this.maTable.setState({ isVisible: true }, () => {
                this.paginateDataSource.reload(true, forceReload);
            });
        }
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("RecherchePartenairesPage render");

        const intlTab: any = this.i18n("partenairesListePage.tableau");
        const isAdmin: boolean = this.isAdmin();

        let checkColumn = isAdmin ? <CheckColumn keyColumn="id" altSelect={intlTab.colonnes.checkTitle} altUnselect={intlTab.colonnes.uncheckTitle} /> : null;


        return (
            <div>
                <span>{this.attributes.forceSearch}</span>
                <h2>{this.i18n("partenairesListePage.form.titreFormulaire")}</h2>
                <Notification id="notifRpaPage" />
                {this.renderFormCriteres()}
                <Table ref={(table) => { this.maTable = table }} id="liste-partenaires" isVisible={this.isTableVisible}>
                    <Header id={"monHeaderRPA"} title={this.i18n("partenairesListePage.tableau.tableTitle")}
                        showIconInfo={true}>
                        <ToggleColumnsButton hiddenColumns={{ organisme: true, prenom: true }} />
                        <MenuActions>
                            <ActionButton title="Export CSV" label="Export CSV"
                                srcImg={Picto.export.csv}
                                action={this.onExport.bind(this, MediaTypes.CSV)} />
                            <ActionButton title="Export PDF" label="Export PDF"
                                srcImg={Picto.export.pdf}
                                action={this.onExport.bind(this, MediaTypes.PDF)} />
                            <ActionButton title="Export ODT" label="Export ODT"
                                srcImg={Picto.export.odt}
                                action={this.onExport.bind(this, MediaTypes.ODT)} />
                            <ActionButton title="Export ODS" label="Export ODS"
                                srcImg={Picto.export.ods}
                                action={this.onExport.bind(this, MediaTypes.ODS)} />
                            <ActionButton typeAction={TypeAction.ACTION_UNITAIRE} title={intlTab.colonnes.edition}
                                label={intlTab.colonnes.edition}
                                srcImg={Picto.black.editer}
                                visible={() => this.isAdmin()}
                                action={this.editerPartenaire} />
                            <ActionButton typeAction={TypeAction.ACTION_UNITAIRE} title={intlTab.colonnes.consultation}
                                label={intlTab.colonnes.consultation}
                                srcImg={Picto.black.consulter}
                                action={this.consulterPartenaire} />
                            <ActionButton typeAction={TypeAction.ACTION_MASSE}
                                priority={true}
                                label={intlTab.colonnes.suppression}
                                srcImg={Picto.white.supprimer}
                                action={this.supprimerEnMasse}
                                title={intlTab.massActionTitle}
                                messageAlert={intlTab.massActionConfirmMessage}
                                titleAlert={intlTab.massActionConfirmTitle}
                                visible={() => this.isAdmin()}
                                hasPopUp={true} />

                        </MenuActions>
                    </Header>
                    <Content dataSource={this.paginateDataSource}>
                        <Columns>

                            {checkColumn}
                            <Column keyColumn="nom" title={intlTab.colonnes.nom} sortable={true} hiddenable={false} style={{ "width": "5em" }} />
                            <Column keyColumn="prenom" title={intlTab.colonnes.prenom} sortable={true} />
                            <Column keyColumn="proCourriel" title={intlTab.colonnes.courriel} sortable={true} style={{ "width": "13em" }} />
                            <Column keyColumn="organisme" title={intlTab.colonnes.organisme} sortable={false} />
                            <YesNoColumn keyColumn="isVIP" title={intlTab.colonnes.labelIsVIP} sortable={true} />
                            <DateColumn keyColumn="dateModif" title={intlTab.colonnes.dateModif} sortable={true} />
                            <ActionColumn keyColumn="consulter"
                                alt={intlTab.colonnes.consultationTitle}
                                srcImg={Picto.blue.consulter}
                                action={this.consulterPartenaire}
                            />
                            <ActionColumn keyColumn="editer"
                                srcImg={Picto.blue.editer}
                                alt={intlTab.colonnes.editionTitle}
                                action={this.editerPartenaire}
                                disabled={() => !this.isAdmin()}
                            />
                            <ActionColumn keyColumn="supprimer"
                                alt={intlTab.colonnes.suppressionTitle}
                                srcImg={Picto.blue.supprimer}
                                action={this.supprimer}
                                messageAlert={intlTab.colonnes.supprimer.message}
                                titleAlert={intlTab.colonnes.supprimer.title}
                                disabled={() => !this.isAdmin()}
                                hasPopUp={true}
                            />
                            <MoreInfoColumn keyColumn="idMore" visible={(value) => value.isVIP === true} alt={intlTab.colonnes.moreInfoTitle}>
                                <LineAfter visible={(value) => value.isVIP === true}>
                                    <DivExpandable className="mm-expandable" />
                                </LineAfter>
                            </MoreInfoColumn>
                        </Columns>
                    </Content>
                    <Footer>
                        <Pager dataSource={this.paginateDataSource} id="maTable-paginate" />
                    </Footer>
                </Table>
            </div>
        );
    }

    /**
     * Méthode permettant d'initialiser le dataSource
     * @param props
     */
    private initDataSource(props): PaginateDataSource<any> {

        if (props.navigateData && props.navigateData.dataSource && props.navigateData.dataSource.defaultSort) {
            return props.navigateData.dataSource;
        }
        return new PaginateDataSource<any>(
            new DataSourceConfigPage(this, this.getService().rechercher), { itemsPerPage: 10 }, {}, [ new DefaultSort([ {
                key: "nom",
                dir: 0
            } as SortData ]) ]);
    }

    /**
     * Evènement exécuté après suppression d'un partenaire
     */
    private refresh(): void {
        if (this.formRecherche && this.formRecherche.validateAndSubmit) {
            this.formRecherche.validateAndSubmit();
            this.maTable.setState({ isVisible: true });
        }

    }

    /**
     * @return true lorsque l'utilisateur courant a le rôle d'administrateur
     */
    private isAdmin(): boolean {
        logger.trace(Roles.ADMIN_STR);
        return AuthUtils.hasRole(this.user, Roles.ADMIN_STR);
    }

    /**
     * Surcharge le style CSS de certaines lignes
     * @param partenaire élément correspondant à une ligne de tableau
     * @returns la/les classes CSS à appliquer à la ligne correspondant à item
     */
    private static customRowsClasses(partenaire: any): ClassDictionary {
        return {
            /*"green-background-row": (partenaire.nom == "ALBERT"),
             "red-background-row": (partenaire.nom == "ALFRED"),
             "yellow-background-row": (partenaire.nom == "BAZIN")*/
        };
    }

    /**
     * Génère le formulaire de sélection de critères de recherche
     */
    private renderFormCriteres(): JSX.Element {
        logger.trace("RecherchePartenairesPage render");

        let context = Utils.getCls("hornet.internationalization");

        const intlMessages = this.i18n("partenairesListePage.form");
        return (
            <div>
                <Form
                    formMessages={intlMessages}
                    schema={schema}
                    subTitle={intlMessages.sousTitreFormulaire}
                    onSubmit={this.onSubmit}
                    text={intlMessages.textIntroForm}
                    ref={(form) => { this.formRecherche = form }}
                    customValidators={[ new ParRpaValidateIsVipEndDate(), new ParRpaValidateSectorStartDate() ]}
                    defaultValues={{ criteres: this.currentCriteres }}
                >
                    <Row>
                        <RadiosField name="criteres.partenaire.isClient"
                            dataSource={this.dataSourceIsClient}
                            label={intlMessages.fields.criteres.partenaire.isClient.label}
                            toolTip={intlMessages.fields.criteres.partenaire.typePartenaire.tooltip}
                            labelClass="blocLabelUp"
                            inline={RadiosField.Inline.FIELD}
                        />
                        <CheckBoxField name="criteres.partenaire.isVIP"
                            label={intlMessages.fields.criteres.partenaire.isVIP.label}
                            lang="en"
                            abbr={intlMessages.fields.criteres.partenaire.isVIP.title}
                            toolTip={intlMessages.fields.criteres.partenaire.isVIP.tooltip}
                            ref={(checkbox) => { this.checkBoxIsVip = checkbox }}
                            onChange={this.changeLabelEndDate}
                            switch={true}
                            inline={CheckBoxField.Inline.ALL}
                        />
                    </Row>
                    <Row>
                        <SelectField name="criteres.idSecteur"
                            label={intlMessages.fields.criteres.idSecteur.label}
                            ref={(select) => { this.secteurSelect = select }}
                            valueKey="id"
                            labelKey="nom"
                            dataSource={this.dataSourceSecteurs}
                        />
                    </Row>

                    <FieldSet legend={intlMessages.groupChamp}>
                        <Row>
                            <CalendarField
                                required={true}
                                label={intlMessages.fields.criteres.startDate.label}
                                name="criteres.startDate"
                                title={intlMessages.fields.criteres.startDate.title}
                            />
                            <CalendarField
                                ref={(date) => { this.endDate = date }}
                                label={intlMessages.fields.criteres.endDate.label}
                                name="criteres.endDate"
                                title={intlMessages.fields.criteres.endDate.title}
                            />
                        </Row>
                    </FieldSet>
                    <ButtonsArea>
                        <Button type="submit" id="envoi" name="action:envoi"
                            value="Valider" className="hornet-button" label={this.i18n("form.search")}
                            title={this.i18n("partenairesListePage.form.searchTitle")} />
                        <Button type="button" id="reinitialiser" name="action:reinitialiser"
                            value="Réinitialiser" className="hornet-button" label={this.i18n("form.reinit")}
                            title={this.i18n("form.reinitTitle")} onClick={this.onReinitialiser} />
                    </ButtonsArea>
                </Form>
            </div>
        );
    }

    /**
     *
     * @param formData
     */

    private onSubmit(formData: any): void {
        logger.trace("onSubmit");

        this.criteresRecherche = formData.criteres;

        formData.pagination = this.paginateDataSource.pagination;
        formData.pagination.pageIndex = 1;

        this.maTable.setState({ isVisible: true });

        this.paginateDataSource.fetch(true, formData.criteres);

    }

    /**
     * Réinitialise le formulaire de recherche avec le valeurs par défaut, vide et réinitialise le tableau, supprime
     * les entrées du CLS.
     * @param e
     */
    private onReinitialiser(e: React.MouseEvent<HTMLElement>): void {
        logger.trace("RecherchePartenairesPage _onReinitialiser");
        e.preventDefault();

        this.maTable.setState({ isVisible: false });

        this.paginateDataSource.deleteAll();

        this.criteresRecherche = {};

        this.setState({
            pagination: {
                pageIndex: 0,
                itemsPerPage: 10,
                totalItems: 0
            }
        });

        this.formRecherche.cleanFormErrors();

        this.formRecherche.updateFields(this.defaultValues);
        this.endDate.setAttribute("required", (this.checkBoxIsVip.getCurrentValue()));

    }

    /**
     * Fonction déclenchée lors du clic sur l'un des boutons d'export
     * @param mediaType type MIME abrégé de l'export souhaité (par exemple "xls")
     */
    private onExport(mediaType: MediaType, value): void {
        logger.trace("onExport");
        if (mediaType == MediaTypes.ODS || mediaType == MediaTypes.ODT) {
            this.getService().exporterODF(mediaType, { criteres: this.criteresRecherche });
        } else {
            this.getService().exporter(mediaType, { criteres: this.criteresRecherche });
        }
    }

    /**
     * Méthode de suppression d'un partenaire
     * @param partenaire élément correspondant à une ligne du tableau de partenaires
     */
    private supprimer(partenaire: PartenaireResult): void {
        logger.trace("Utilisateur est OK pour supprimer l item id:", partenaire.id);

        let notifSuccessText: string = this.i18n("info.message.IN-PA-RPA-01", {
            "$0": partenaire.prenom,
            "$1": partenaire.nom
        });
        let notifErrorText: string = this.i18n("error.message.ER-PA-RPA-07", {
            "$0": partenaire.prenom,
            "$1": partenaire.nom
        });
        let errors: Notifications = new Notifications();
        let notif = new NotificationType();
        let confirmations: Notifications = new Notifications();
        notif.id = "DEL_PARTNER_" + partenaire.id;

        if (partenaire.isVIP) {
            notif.text = notifErrorText;
            errors.addNotification(notif);
            NotificationManager.notify("notifRpaPage", errors, confirmations);
            this.refresh();
        } else {
            this.getService().supprimer(partenaire.id).then((res) => {
                if (typeof (res) === "boolean" && !res) {
                    notif.text = notifErrorText;
                    errors.addNotification(notif);
                } else {
                    notif.text = notifSuccessText;
                    confirmations.addNotification(notif);
                }
                NotificationManager.notify("notifRpaPage", errors, confirmations);
                this.refresh();
            });
        }
    }

    /**
     * Méthode de suppression de plusieurs partenaires
     * @param partenaires éléments correspondant à des ligne du tableau de partenaires
     */
    private supprimerEnMasse(value, partenaires: PartenaireResult[]): void {
        logger.trace("L'utilisateur est OK pour supprimer {0} partenaires", partenaires.length);

        this.getService().supprimerEnMasse(partenaires).then((ids: number[] | {}) => {

            let confirmations: Notifications = new Notifications();
            let errors: Notifications = new Notifications();
            partenaires.forEach((partenaire: PartenaireResult) => {
                if (ids && (ids as number[]).indexOf && (ids as number[]).indexOf(partenaire.id) >= 0) {
                    let notif = new NotificationType();
                    notif.id = "DEL_PARTNER_" + partenaire.id;
                    notif.text = this.i18n("info.message.IN-PA-RPA-01", {
                        "$0": partenaire.prenom,
                        "$1": partenaire.nom
                    });

                    confirmations.addNotification(notif);
                } else if (partenaire.isVIP) {
                    let notif = new NotificationType();
                    notif.id = "DEL_PARTNER_" + partenaire.id;
                    notif.text = this.i18n("error.message.ER-PA-RPA-03", {
                        "nom": partenaire.nom,
                        "prenom": partenaire.prenom
                    });

                    errors.addNotification(notif);
                } else {
                    let notif = new NotificationType();
                    notif.id = "DEL_PARTNER_" + partenaire.id;
                    notif.text = this.i18n("error.message.ER-PA-RPA-07", {
                        "$0": partenaire.prenom,
                        "$1": partenaire.nom
                    });

                    errors.addNotification(notif);
                }
            });

            NotificationManager.notify("notifRpaPage", errors, confirmations);

            this.refresh();
        });
    }

    /**
     * appel a la page d'édition d'un partenaire
     * on lui passe si le partenaire est vip ou non en donnée
     * @param partenaire
     */
    private editerPartenaire(partenaire: PartenaireResult) {
        let url = "/partenaires/editer/" + partenaire.id;
        this.navigateTo(url, {
            "isVIP": partenaire.isVIP,
            criteres: this.criteresRecherche,
            dataSource: this.paginateDataSource
        }, null);
    }

    /**
     * appel a la page de consultation d'un partenaire
     * on lui passe si le partenaire est vip ou non en donnée
     * @param partenaire
     */
    private consulterPartenaire(partenaire: PartenaireResult) {
        let url = "/partenaires/consulter/" + partenaire.id;
        this.navigateTo(url, {
            "isVIP": partenaire.isVIP,
            criteres: this.criteresRecherche,
            dataSource: this.paginateDataSource
        }, null);
    }

    /**
     * @param time {Number} temps UTC en ms depuis "Epoch"
     * @returns {string} la date formatée suivant le format défini pour les calendriers
     */
    private getDateFormatee(time: any): string {
        return Utils.dateUtils.formatInTZ(new Date(time), this.i18n("calendar").dateFormat, Utils.dateUtils.TZ_EUROPE_PARIS);
    }

    private changeLabelEndDate(event) {
        this.endDate.setAttribute("required", (event.target.checked));
    }
}

const DivExpandable = (props) => {

    return (
        <div className="grid" key={"card-container-" + props.value.nom + "-" + props.value.prenom}>
            <div style={{ float: "left", width: "10%" }} className="one-fifth">
                <img src={Picto.grey.userCircle} style={{ width: "200%" }} />
            </div>
            <div className={props.className}
                key={"card-content-" + props.value.nom + "-" + props.value.prenom}>
                <div className="card-content-title">{props.value.nom + " " + props.value.prenom}</div>
                <div className="card-content-list-item">{props.value.proCourriel}</div>
                <div className="card-content-list-item">{props.value.organisme}</div>
            </div>
        </div>
    );
};