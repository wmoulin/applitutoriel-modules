import * as React from "react";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { HornetComponent } from "hornet-js-react-components/src/widget/component/hornet-component";

export interface FichePartenaireTitrePageProps extends HornetComponentProps {
    title: string;
}

export class FichePartenaireTitrePage extends HornetComponent<FichePartenaireTitrePageProps, any> {

    constructor(props?: FichePartenaireTitrePageProps, context?: any) {
        super(props, context);
        /* Par defaut, le titre est vide, il est mis à jour depuis la methode prepareClient de la page */
        this.state.title = this.props.title;
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        return (<h2>{this.state.title}</h2>);
    }
}
