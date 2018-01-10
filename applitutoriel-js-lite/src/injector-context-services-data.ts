import { Injector } from "hornet-js-core/src/inject/injector";
import { Scope } from "hornet-js-core/src/inject/injectable";
import { Utils } from "hornet-js-utils";
import { AuthService } from "applitutoriel-js-common/src/services/data/auth/auth-service";
import { AdministrationSecteurServiceData } from 'applitutoriel-js-common/src/services/data/adm/adm-secteur-service-data';
import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
import { ReferentielPaysService } from "applitutoriel-js-common/src/services/data/ref/ref-pays-service";
import { FicheProduitService } from "applitutoriel-js-common/src/services/data/adm/adm-fpo-service-page";

Injector.register("configApplitutoDatabase", "config");

if (Utils.config.getOrDefault("mock.enabled", false) && Utils.config.getOrDefault("mock.serviceData.enabled", false)) {
    Promise.all([
        import("applitutoriel-js-common/src/mock/services/data/auth/auth-service-data-mock-impl"),
        import("applitutoriel-js-common/src/mock/services/data/adm/secteur-service-data-mock-impl"),
        import("applitutoriel-js-common/src/mock/services/data/par/partenaire-service-data-mock-impl"),
        import("applitutoriel-js-common/src/mock/services/data/ref/ref-pays-service-data-mock-impl"),
        import("applitutoriel-js-common/src/mock/services/data/pro/fpo-service-data-mock-impl")
    ]).then(([AuthServiceDataMockImpl, SecteurServiceDataMockImpl, PartenaireServiceDataMockImpl, ReferentielPaysServiceDataMockImpl, FicheProduitServiceDataMockImpl]) => {
        Injector.register(AuthService, AuthServiceDataMockImpl.AuthServiceDataMockImpl, Scope.SINGLETON);
        Injector.register(AdministrationSecteurServiceData, SecteurServiceDataMockImpl.SecteurServiceDataMockImpl);
        Injector.register(PartenaireService, PartenaireServiceDataMockImpl.PartenaireServiceDataMockImpl);
        Injector.register(ReferentielPaysService, ReferentielPaysServiceDataMockImpl.ReferentielPaysServiceDataMockImpl);
        Injector.register(FicheProduitService, FicheProduitServiceDataMockImpl.FicheProduitServiceDataMockImpl);
        // Injector.register(FichePartenaireService, FichePartenaireServiceMockImpl.FichePartenaireServiceMockImpl);
    });
} else {
    Promise.all([
        import("src/services/data/auth/auth-service-impl"),
        import("src/services/data/sec/secteur-service-impl"),
        import("src/services/data/par/partenaire-service-impl"),
        import("src/services/data/ref/ref-pays-service-impl"),
        import("src/services/data/pro/fpo-service-data-impl")
    ]).then(([AuthServiceImpl, SecteurServiceImpl, PartenaireServiceImpl, ReferentielPaysServiceImpl, FicheProduitServiceImpl]) => {
        Injector.register(AuthService, AuthServiceImpl.AuthServiceImpl, Scope.SINGLETON);
        Injector.register(AdministrationSecteurServiceData, SecteurServiceImpl.SecteurServiceImpl);
        Injector.register(PartenaireService, PartenaireServiceImpl.PartenaireServiceImpl);
        Injector.register(ReferentielPaysService, ReferentielPaysServiceImpl.ReferentielPaysServiceImpl);
        Injector.register(FicheProduitService, FicheProduitServiceImpl.FicheProduitServiceImpl);

        // Injector.register(FichePartenaireService, FichePartenaireServiceImpl);
    });
}


