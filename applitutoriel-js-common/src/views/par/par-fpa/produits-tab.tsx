import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { Table } from "hornet-js-react-components/src/widget/table/table";
import { Column } from "hornet-js-react-components/src/widget/table/column";
import { Columns } from "hornet-js-react-components/src/widget/table/columns";
import { Header } from "hornet-js-react-components/src/widget/table/header";
import { Content } from "hornet-js-react-components/src/widget/table/content";
import { PaginateDataSource } from "hornet-js-core/src/component/datasource/paginate-datasource";
import { HornetComponent } from "hornet-js-react-components/src/widget/component/hornet-component";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Footer } from "hornet-js-react-components/src/widget/table/footer";
import { Pager } from "hornet-js-react-components/src/widget/pager/pager";
import * as React from "react";
import { ProduitMetier } from "src/models/pro/pro-mod";

const logger: Logger = Utils.getLogger("applitutoriel.views.par.par-fpa.produits-tab");

export interface ProduitsTabProps extends HornetComponentProps {
    dataSource: PaginateDataSource<ProduitMetier>;
}

/**
 * Page d'administration des secteurs. L'ajout ou l'édition d'un secteur se fait dans une fenêtre modale.
 */
export class ProduitsTab extends HornetComponent<ProduitsTabProps, any> {

    private tabProdI18n: any = this.i18n("partenaireFichePage.tableauProduits");

    constructor(props: ProduitsTabProps, context?: any) {
        super(props, context);
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        return (
            <div className="pts">
                <Table id="liste-produits">
                    <Header title={this.i18n("partenaireFichePage.tableauProduits.tableTitle")}/>
                    <Content dataSource={this.props.dataSource}>
                        <Columns>
                            <Column keyColumn="nom" title={this.tabProdI18n.colonnes.nom} sortable={true}/>
                            <Column keyColumn="desc" title={this.tabProdI18n.colonnes.desc} sortable={true}/>
                        </Columns>
                    </Content>
                    <Footer>
                        <Pager dataSource={this.props.dataSource} id="maTable-paginate"/>
                    </Footer>
                </Table>
            </div>
        );
    }
}
