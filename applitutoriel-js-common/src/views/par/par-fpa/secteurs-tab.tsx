import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as React from "react";
import { Notification } from "hornet-js-react-components/src/widget/notification/notification";
import { Table } from "hornet-js-react-components/src/widget/table/table";
import { Column } from "hornet-js-react-components/src/widget/table/column";
import { Columns } from "hornet-js-react-components/src/widget/table/columns";
import { DateColumn } from "hornet-js-react-components/src/widget/table/column/date-column";
import { Header } from "hornet-js-react-components/src/widget/table/header";
import { Content } from "hornet-js-react-components/src/widget/table/content";
import { SortData } from "hornet-js-core/src/component/sort-data";
import { SortDirection } from "hornet-js-core/src/component/sort-data";
import { TabContent } from "hornet-js-react-components/src/widget/tab/tab-content";
import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { SecteurMetier } from "src/models/adm/sec-mod";
import * as schemaEditionTable from "src/views/adm/adm-lst-table-validation.json";

const logger: Logger = Utils.getLogger("applitutoriel.views.par.par-fpa.secteurs-tab");

export interface SecteursTabProps extends HornetComponentProps {
    dataSource: PaginateDataSource<SecteurMetier>;
}

/**
 * Page d'administration des secteurs. L'ajout ou l'édition d'un secteur se fait dans une fenêtre modale.
 */
export class SecteursTab extends TabContent<SecteursTabProps, any> {

    private secteurI18n = this.i18n("administration.secteurs");

    constructor(props?: SecteursTabProps, context?: any) {
        super(props, context);
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        return (
            <div className="pts">
                <Notification id="notif2"/>
                <Table id="liste-secteurs">
                    <Header title={this.secteurI18n.table.tableTitle}>
                    </Header>
                    <Content dataSource={this.props.dataSource} schema={schemaEditionTable}
                             notifId="notif2">
                        <Columns>
                            <Column keyColumn="nom"
                                    title={this.secteurI18n.nom}
                                    sortable={false}
                            />
                            <Column keyColumn="desc" title={this.secteurI18n.description} sortable={false}/>
                            <DateColumn keyColumn="dateCreat" title={this.secteurI18n.dateCr} sortable={false}/>
                            <DateColumn keyColumn="dateMajEnreg" title={this.secteurI18n.dateMaj} sortable={false}/>
                            <Column keyColumn="auteurCreat" title={this.secteurI18n.auteur} sortable={false}/>
                        </Columns>
                    </Content>
                </Table>
            </div>
        );
    }

    /**
     * exemple de tri multicolonnes
     */
    private sortMulti(): void {
        this.props.dataSource.sort([new SortData("dateCreat", SortDirection.DESC), new SortData("auteurCreat")]);
    }
}
