import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as React from "react";
import { HornetComponentProps } from "hornet-js-components/src/component/ihornet-component";
import { HornetComponent } from "hornet-js-react-components/src/widget/component/hornet-component";
import * as _ from "lodash";

const logger: Logger = Utils.getLogger("applitutoriel.views.gen.gen-cnx-page");

export interface ConnexionPageProps extends HornetComponentProps {
    errorMessage?: any,
    previousUrl?: string,
    staticUrl?: string
}

/**
 * Ecran de connexion
 */
export class ConnexionPage extends HornetComponent<ConnexionPageProps, any> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.getElementById("username").focus();
    }

    /**
     * @inheritDoc
     */
    render(): JSX.Element {
        logger.trace("VIEW ConnexionPage render");

        let fwkTheme: string = process.env.NODE_ENV === "production" ? "/css/theme-min.css" : "/css/theme.css";

        return (
            <html lang='fr'>
                <head>
                    <title>{"Magasin de L'Étang-Salé : Authentification centrale"}</title>
                    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                    <link rel="icon" type="image/png" href={this.genUrlStatic("/img/logoHornet.png")} />
                    <link rel="stylesheet" type="text/css" href={ConnexionPage.genUrlTheme(fwkTheme)} />
                    <link rel="stylesheet" type="text/css" href={this.genUrlStatic("/css/auth.css")} />
                </head>
                <body id="auth">
                    <div id="site">
                        <div id="content">
                            <h1 id="app-name">{"Magasin de L'étang-salé Authentification centrale."}</h1>
                            <form id="fm1" className="fm-v" method="post">
                                <div id="login" className="box">
                                    <h2>Entrez votre identifiant et votre mot de passe.</h2>

                                    {this._renderErrorDiv()}
                                    <div className="cnx-info">
                                        <p> Se connecter en tant que : </p>
                                        <p> Administrateur : admin / admin</p>
                                        <p> Utilisateur : user / user </p>
                                    </div>
                                    <div className="row">
                                        <label htmlFor="username"><span className="accesskey">I</span>dentifiant :</label>
                                        <input autoFocus type="text" accessKey="i" tabIndex={1} className="required"
                                            ref="username" name="username" id="username" />
                                    </div>
                                    <div className="row">
                                        <label htmlFor="password"><span className="accesskey">M</span>ot de passe :</label>
                                        <input type="password" accessKey="m" tabIndex={2}
                                            className="required" ref="password" name="password" id="password" />
                                    </div>
                                    <input type="hidden" name="previousUrl" value={this.state.previousUrl} />

                                    <div className="row btn-row">
                                        <button type="submit" tabIndex={4} accessKey="l" name="submit"
                                            className="btn-submit"> SE CONNECTER </button>
                                    </div>

                                </div>
                            </form>

                            <div id="sidebar">
                                <p>{"Pour des raisons de sécurité, veuillez vous déconnecter et fermer votre navigateur lorsque vous avez fini d'accéder aux pages authentifiées."}</p>
                            </div>
                        </div>
                        <div id="footer">
                            <div>
                                <p>&nbsp;</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html >
        );
    }

    _renderErrorDiv() {

        if (_.isArray(this.state.errorMessage) && this.state.errorMessage.length >= 1) {
            return (
                <div className="errors" id="status">
                    {this.state.errorMessage}
                </div>
            );
        } else {
            return null;
        }
    }

}