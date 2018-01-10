import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as React from "react";
import { HornetPage } from "hornet-js-react-components/src/widget/component/hornet-page";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { Form } from "hornet-js-react-components/src/widget/form/form";
import { Row } from "hornet-js-react-components/src/widget/form/row";
import { InputField } from "hornet-js-react-components/src/widget/form/input-field";

import * as validationSchema from "test/page/example-page-validation.json";

const logger: Logger = Utils.getLogger("applitutoriel.test.page.example-page");

/**
 * Exemple simple de page utilisant un formulaire hornet.
 */
export class ExamplePage extends HornetPage<any, HornetComponentProps, any> {

    /** Référence vers le formulaire */
    private exampleForm: Form;

    /** @inheritDoc */
    prepareClient(): void {
        /* Initialise les champs du formulaire */
        this.exampleForm.updateFields({
            nom: "Martin",
            prenom: "Henri"
        });
    }

    /**
     * Fonction déclenchée à la soumission du formulaire
     * @param formData données du formulaire
     */
    private onSubmit(formData: any): void {
        logger.trace("Envoi du formulaire");
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("render - form ");

        return (
            <div>
                <h2>Exemple</h2>

                <Form
                    ref={(form) => {this.exampleForm = form;}}
                    onSubmit={this.onSubmit}
                    schema={validationSchema}>
                    <Row>
                        {/* Champs Hornet de type texte */}
                        <InputField name="nom" label="Nom" required={true}/>
                        <InputField name="prenom" label="Prénom" required={true}/>
                    </Row>
                </Form>
            </div>
        );
    }
}