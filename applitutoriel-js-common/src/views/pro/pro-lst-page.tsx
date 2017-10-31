import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as React from "react";
import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";

import { Table } from "hornet-js-react-components/src/widget/table/table";
import { Column } from "hornet-js-react-components/src/widget/table/column";
import { DateColumn } from "hornet-js-react-components/src/widget/table/column/date-column";
import { AdministrationSecteurService } from "src/services/page/adm/adm-secteur-service";

import { DataSource } from "hornet-js-core/src/component/datasource/datasource";
import { DataSourceConfigPage } from "hornet-js-core/src/component/datasource/config/service/datasource-config-page";

const logger: Logger = Utils.getLogger("applitutoriel.views.pro.pro-lst-page");

export class ListeProduitsPage extends HornetPage<AdministrationSecteurService, HornetComponentProps, any> {

    private dataSource: DataSource<any>;

    constructor(props?: HornetComponentProps, context?: any) {
        super(props, context);

        this.state.data = [];
        this.dataSource = new DataSource<any>(new DataSourceConfigPage(this, this.getService().lister), {});
    }

    prepareClient() {
        this.dataSource.fetch(true);
    }

    render() {

        return (
            <div>
                <h2>Liste des Secteurs</h2>
                <Table id="liste-produit">
                    <Column keyColumn="desc" title="Description" sortable={true}/>
                    <Column keyColumn="auteurMajEnreg" title="Utilisateur" sortable={true}/>
                    <DateColumn keyColumn="dateMajEnreg" title="Date de modification" sortable={true}/>
                </Table>
            </div>
        );
    }
}