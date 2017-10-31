import * as React from "react";
import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Button } from "hornet-js-react-components/src/widget/button/button";
import { FicheProduitService } from "src/services/page/adm/adm-fpo-service-page";
import { ButtonsArea } from "hornet-js-react-components/src/widget/form/buttons-area";
import * as Chart from "chart.js";

const logger: Logger = Utils.getLogger("applitutoriel.views.adm.adm-rps-page");

export class RepartitionPage extends HornetPage<FicheProduitService, HornetComponentProps, any> {

    private chart = null;
    private element = null;
    private data = null;

    private color = Chart.helpers.color;

    static defaultProps: any = {
        options: {
            title: {
                display: true,
                text: ""
            },
            legend: {
                position: "bottom"
            }
        },
        type: "polarArea"
    };

    constructor(props?, context?) {
        super(props, context);

        Chart.plugins.register({
            afterDatasetsDraw: function (chart, easing) {
                let ctx = chart.ctx;
                chart.data.datasets.forEach(function (dataset, i) {
                    let meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach(function (element, index) {
                            // dessine en noir
                            ctx.fillStyle = "rgb(0, 0, 0)";
                            ctx.font = Chart.helpers.fontString("1em", "bold", "NotoSansUI");
                            ctx.textAlign = "center";
                            ctx.textBaseline = "middle";
                            let position = element.tooltipPosition();
                            ctx.fillText(dataset.data[index].toString(), position.x, position.y - 5);
                        });
                    }
                });
            }
        });
    }

    prepareClient() {
        this.data = {
            datasets: [{
                data: [],
                backgroundColor: [],
                label: RepartitionPage.getI18n("repartitionPage.title")
            }],
            labels: []
        };

        this.getService().repartition().then((data) => {
            //this.Donut.drawDonutWithData(data);
            for (let i = 0; i < data.length; i++) {
                this.data.datasets[0].data.push(data[i].value);
                this.data.datasets[0].backgroundColor.push(this.color(data[i].color).alpha(0.5).rgbString());
                this.data.labels.push(data[i].label);
            }
            this.setState({data: this.data});
        });
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("VIEW RepartitionPage render");

        let maxWidth = 550;
        let maxHeight = 550;
        let style = {maxWidth, maxHeight, padding: "20px"};

        return (
            <div>
                <h2>{this.i18n("repartitionPage.title")}</h2>
                <div style={style} className="center">

                    <div id="chartdiv" style={style}>
                        <canvas ref={(element) => {
                            this.element = element;
                        }} width={500} height={500} style={style}/>
                    </div>
                </div>
                <ButtonsArea>
                    <Button id="doughnut" className="hornet-button" onClick={(e) => {
                        this.setState({type: "doughnut"});
                    }} label={this.i18n("repartitionPage.type.doughnut")}/>
                    <Button id="pie" className="hornet-button" onClick={(e) => {
                        this.setState({type: "pie"});
                    }} label={this.i18n("repartitionPage.type.pie")}/>
                    <Button id="polarArea" className="hornet-button" onClick={(e) => {
                        this.setState({type: "polarArea"});
                    }} label={this.i18n("repartitionPage.type.polarArea")}/>
                </ButtonsArea>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.chart) this.chart.destroy();
        this.chart = new Chart(this.element as any, {
            type: this.state.type,
            data: this.state.data,
            options: this.state.options
        }); // polarArea doughnut
    }

}