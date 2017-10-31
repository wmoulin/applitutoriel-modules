import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as React from "react";
import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Modal } from "hornet-js-react-components/src/widget/dialog/modal";
import { Notification } from "hornet-js-react-components/src/widget/notification/notification";
import { NotificationManager, Notifications } from "hornet-js-core/src/notification/notification-manager";
import { Form } from "hornet-js-react-components/src/widget/form/form";
import { Row } from "hornet-js-react-components/src/widget/form/row";
import { InputField } from "hornet-js-react-components/src/widget/form/input-field";
import { Button } from "hornet-js-react-components/src/widget/button/button";
import { SecteurMetier } from "src/models/adm/sec-mod";
import { AdministrationSecteurService } from "src/services/page/adm/adm-secteur-service";
import { Table } from "hornet-js-react-components/src/widget/table/table";
import { Column } from "hornet-js-react-components/src/widget/table/column";
import { Columns } from "hornet-js-react-components/src/widget/table/columns";
import { DateColumn } from "hornet-js-react-components/src/widget/table/column/date-column";
import { MenuActions } from "hornet-js-react-components/src/widget/table/menu-actions";
import { ActionButton } from "hornet-js-react-components/src/widget/table/action-button";
import { Header } from "hornet-js-react-components/src/widget/table/header";
import { Content } from "hornet-js-react-components/src/widget/table/content";
import { Picto } from "hornet-js-react-components/src/img/picto";
import { ActionColumn } from "hornet-js-react-components/src/widget/table/column/action-column";
import { ToggleColumnsButton } from "hornet-js-react-components/src/widget/table/toggle-columns-button";
import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { ButtonsArea } from "hornet-js-react-components/src/widget/form/buttons-area";
import { DefaultSort } from "hornet-js-core/src/component/datasource/options/datasource-option";
import { EditionActionColumn } from "hornet-js-react-components/src/widget/table/column/edition-action-column";
import { SortData } from "hornet-js-core/src/component/sort-data";
import { SortDirection } from "hornet-js-core/src/component/sort-data";
import * as schema from "src/views/adm/adm-lst-page-validation.json";
import * as schemaEditionTable from "src/views/adm/adm-lst-table-validation.json";

const logger: Logger = Utils.getLogger("applitutoriel.views.adm.adm-lst-page");

/**
 * Page d'administration des secteurs. L'ajout ou l'édition d'un secteur se fait dans une fenêtre modale.
 */
export class SecteursPage extends HornetPage<AdministrationSecteurService, HornetComponentProps, any> {

    // Composants
    /** Tableau de liste de secteurs */
    private dataSource: DataSource<any>;

    /** Modale d'édition de secteur */
    private maModale: Modal;

    /** Formulaire d'édition de secteur */
    private monForm: Form;

    protected headerTable: any;

    protected item: SecteurMetier;


    constructor(props?, context?) {

        super(props, context);

        this.refHeaderTable.bind(this);

        let sort: DefaultSort = new DefaultSort([new SortData("dateCreat"), new SortData("auteurCreat", SortDirection.ASC)]);
        this.dataSource = new DataSource<SecteurMetier>([], {}, [sort]);
    }

    /**
     * Alimente le tableau de liste des secteurs.
     * @override
     */
    public prepareClient(): void {
        this.refreshSecteurs();
    }

    /**
     * Met à jour le tableau de liste des secteurs
     */
    private refreshSecteurs(): void {
        this.getService().lister().then((result) => {
            this.dataSource.deleteAll();
            this.dataSource.add(false, result);
        });
    }

    refHeaderTable(element) {
        this.headerTable = element;
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        // test d'erreur dans les render react
        // var i;
        // i.toString();
        // throw "test error";
        logger.trace("VIEW SecteursPage render");
        const intlMessages = this.i18n("administration.secteurs");
        const formI18n = this.i18n("administration.secteurs.form");

        return (
            <div>
                <h2>{this.i18n("administration.secteurs.titreSecteur")}</h2>
                <Notification id="notif2"/>

                <Table id="liste-secteurs">
                    <Header title={this.i18n("administration.secteurs").table.tableTitle} ref={this.refHeaderTable}>
                        <ToggleColumnsButton hiddenColumns={{desc: true, nom: false}}
                                             onChange={this.onChangeToggleColumns}
                                             selectAllItem={false}/>
                        <MenuActions>
                            <ActionButton title={this.i18n("administration.secteurs.table.addTitle")}
                                          srcImg={Picto.white.add}
                                          action={this.ajouterSecteur} priority={true}/>
                            <ActionButton title={this.i18n("administration.secteurs.table.sortMultiTitle")}
                                          srcImg={Picto.white.consulter}
                                          action={this.sortMulti} priority={true}/>
                        </MenuActions>
                    </Header>
                    <Content dataSource={this.dataSource} onSubmit={this.submitLineForm} schema={schemaEditionTable}
                             notifId="notif2">
                        <Columns>
                            <Column keyColumn="nom"
                                    title={intlMessages.nom}
                                    editable={true}
                                    sortable={true}
                            />
                            <Column keyColumn="desc" title={intlMessages.description} sortable={false}/>
                            <DateColumn keyColumn="dateCreat" title={intlMessages.dateCr} sortable={true}/>
                            <DateColumn keyColumn="dateMajEnreg" title={intlMessages.dateMaj} sortable={false}/>
                            <Column keyColumn="auteurCreat" title={intlMessages.auteur} sortable={true}/>
                            <ActionColumn keyColumn="id"
                                          alt={intlMessages.modificationTitle}
                                          srcImg={Picto.blue.editer}
                                          action={this.editItem.bind(this)}
                            />
                            <ActionColumn keyColumn="id"
                                          alt={intlMessages.suppressionAlt}
                                          srcImg={Picto.blue.supprimer}
                                          action={this.supprimer.bind(this)}
                                          messageAlert={this.i18n("administration.secteurs.confirmationSuppression")}
                                          titleAlert={this.i18n("administration.secteurs.suppressionTitle")}
                            />
                            <EditionActionColumn keyColumn="id"
                                                 titleEdit={intlMessages.quickUpdateTitle}
                                                 titleSave={"Enregistrer"}
                                                 titleCancel={"Annuler"}
                                                 messageAlert={this.i18n("administration.secteurs.confirmationAnnulationAction")}
                                                 titleAlert={this.i18n("administration.secteurs.annulationTitle")}
                            />
                        </Columns>
                    </Content>
                </Table>
                <Modal ref={(modal: Modal) => {
                    this.maModale = modal;
                }} withoutOverflow={true} underlayClickExits={false} focusDialog={false}
                       onClickClose={this.closeModal}>
                    <div className="content-modal-body">
                        <Form
                            ref={(form: Form) => {
                                this.monForm = form;
                                if (this.monForm) {
                                    this.monForm.updateFields(this.item);
                                }
                            }}
                            schema={schema}
                            formMessages={formI18n}
                            onSubmit={this.onSubmitEdition}
                        >
                            <InputField name="id" type="hidden"/>
                            <Row>
                                <InputField name="nom" label={formI18n.fields.nom.label}
                                            required={true} size={40} maxLength={50}/>
                            </Row>
                            <Row>
                                <InputField name="desc" label={formI18n.fields.desc.label}
                                            required={true} size={40} maxLength={200}/>
                            </Row>
                            <ButtonsArea>
                                <Button type="submit" id="enregistrer" name="action:save"
                                        value="Enregistrer" className="hornet-button" label={this.i18n("form.valid")}
                                        title={this.i18n("administration.validTitle")}/>
                                <Button type="button" id="cancel" name="action:cancel"
                                        value="Annuler" className="hornet-button" label={this.i18n("form.cancel")}
                                        title={this.i18n("administration.cancelTitle")} onClick={this.closeModal}/>
                            </ButtonsArea>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }

    /**
     * Méthode permettant de connaître les colonnes affichées/masquées
     * @param columns
     */
    private onChangeToggleColumns(columns: any): void {
        logger.debug("MAJ toggle columns :", columns);
    }

    /**
     * Fonction de submit du formulaire
     * @param item: l'item du tableau qu a été edité
     */
    private submitLineForm(item: any): void {
        this.getService().modifier(item.id, item).then(() => {
            NotificationManager.notify(null, null, Notifications.makeSingleNotification("", this.i18n("info.message.IN-AD-LST-01")));
            this.refreshSecteurs();
        });

    }

    /**
     * Déclenche la suppression du secteur ayant l'identifiant indiqué
     * @param item
     */
    private supprimer(item) {
        logger.trace("Utilisateur est OK pour supprimer l item id:", item.id);

        NotificationManager.cleanAll();

        this.getService().supprimer(item.id).then((result) => {
            if (!result.errors) {
                NotificationManager.notify(null, null,
                    Notifications.makeSingleNotification("SECTEUR_DELETED", "info.message.IN-AD-LST-02"));
                this.refreshSecteurs();
            }
        });
    }

    /**
     * Ouvre la fenêtre modale d'édition de secteur
     * @param item élément du tableau de secteurs
     */
    private editItem(item): void {
        this.maModale.setTitle(this.i18n("administration.modification"));
        this.maModale.setCloseLabel(this.i18n("administration.closeModification"));
        this.item = item;
        this.maModale.open();
    }

    /**
     * Ouvre la fenêtre modale de création de secteur
     */
    private ajouterSecteur(): void {
        this.maModale.setTitle(this.i18n("administration.ajout"))
            .setCloseLabel(this.i18n("administration.closeAjout"))
            .open();
    }

    /**
     * exemple de tri multicolonnes
     */
    private sortMulti(): void {
        this.dataSource.sort([new SortData("dateCreat", SortDirection.DESC), new SortData("auteurCreat")]);
    }

    /**
     * Ferme la modale de création/édition de secteur sans appliquer les changements.
     */
    private closeModal(): void {
        this.maModale.close();
        this.item = null;
    }

    /**
     * Fonction déclenchée lors de l'envoi du formulaire d'édition de secteur
     * @param data données du formulaire
     */
    private onSubmitEdition(data: any): void {
        NotificationManager.cleanAll();

        let secteur = data;
        if (!_.isEmpty(secteur.id)) {
            this.getService().modifier(secteur.id, secteur).then((result) => {
                if (!result.errors) {
                    this.closeModal();
                    NotificationManager.notify(null, null,
                        Notifications.makeSingleNotification("", this.i18n("info.message.IN-AD-LST-01")));
                    this.refreshSecteurs();
                }
            });
        } else {
            /* On ajoute le nom de l'utilisateur connecté aux informations saisies dans le formulaire */
            if (this.user) {
                secteur.user = this.user.name;
            }

            this.getService().creer(secteur).then((result) => {
                if (!result.errors) {
                    this.closeModal();
                    NotificationManager.notify(null, null,
                        Notifications.makeSingleNotification("", this.i18n("info.message.IN-AD-LST-03")));
                    this.refreshSecteurs();
                }
            });
        }
    }
}
