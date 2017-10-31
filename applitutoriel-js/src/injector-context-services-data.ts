import { Utils } from "hornet-js-utils";

import { AuthService } from "applitutoriel-js-common/src/services/data/auth/auth-service";
import { AuthServiceImpl } from "src/services/data/auth/auth-service-impl";
import { AuthServiceDataMockImpl } from "applitutoriel-js-common/src/mock/services/data/auth/auth-service-data-impl-mock";

import { ApplitutorielSecteursServiceImpl } from "applitutoriel-js-common/src/services/applitutoriel-secteurs-service-impl";
import { SecteurServiceImpl } from "src/services/page/sec/secteur-service-page-impl";
import { SecteurServiceDataMockImpl } from "applitutoriel-js-common/src/mock/services/data/adm/secteur-service-data-mock-impl";

import { PartenaireService } from "applitutoriel-js-common/src/services/data/par/partenaire-service";
import { PartenaireServiceImpl } from "src/services/data/par/partenaire-service-impl";
import { PartenaireServiceDataMockImpl } from "applitutoriel-js-common/src/mock/services/data/par/partenaire-service-data-mock-impl";


import { FichePartenaireServiceImpl } from "src/services/page/par/par-fpa-service-impl";
import { FichePartenaireService } from "applitutoriel-js-common/src/services/data/par/fiche-partenaire-service";

import { ReferentielPaysService } from "applitutoriel-js-common/src/services/data/ref/ref-pays-service";
import { ReferentielPaysServiceImpl } from "src/services/data/ref/ref-pays-service-impl";
import { ReferentielPaysServiceDataMockImpl } from "applitutoriel-js-common/src/mock/services/data/ref/ref-pays-service-data-mock-impl";


import { Injector } from "hornet-js-core/src/inject/injector";
import { Scope } from "hornet-js-core/src/inject/injectable";


if (Utils.config.getOrDefault("mock.enabled", false) && Utils.config.getOrDefault("mock.serviceData.enabled", false)) {
    // Mock des serviceData
    Injector.register(AuthService, AuthServiceDataMockImpl, Scope.SINGLETON);
    Injector.register(ApplitutorielSecteursServiceImpl, SecteurServiceDataMockImpl);
    Injector.register(PartenaireService, PartenaireServiceDataMockImpl);
    Injector.register(ReferentielPaysService, ReferentielPaysServiceDataMockImpl);

} else {
    Injector.register(AuthService, AuthServiceImpl, Scope.SINGLETON);
    Injector.register(ApplitutorielSecteursServiceImpl, SecteurServiceImpl);
    Injector.register(PartenaireService, PartenaireServiceImpl);
    Injector.register(ReferentielPaysService, ReferentielPaysServiceImpl);
    Injector.register(FichePartenaireService, FichePartenaireServiceImpl);
}


