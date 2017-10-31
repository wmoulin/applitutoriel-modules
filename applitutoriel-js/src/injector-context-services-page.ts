
import { Injector } from "hornet-js-core/src/inject/injector";
import { Utils } from "hornet-js-utils";

import { SecteurServicePageMockImpl } from "applitutoriel-js-common/src/mock/services/page/adm/secteur-service-page-mock-impl";
import { SecteurServiceImpl } from "src/services/page/sec/secteur-service-page-impl";
import { AdministrationSecteurService } from "applitutoriel-js-common/src/services/page/adm/adm-secteur-service";
import { FichePartenairePageService } from "applitutoriel-js-common/src/services/page/par/par-fpa-service";
import { FichePartenaireServicePageMockImpl } from "applitutoriel-js-common/src/mock/services/page/par/fiche-partenaire-service-page-mock-impl";
import { FichePartenaireServiceImpl } from "src/services/page/par/par-fpa-service-impl";
import { RecherchePartenaireService } from "applitutoriel-js-common/src/services/page/par/par-rpa-service";
import { PartenaireServicePageMockImpl } from "applitutoriel-js-common/src/mock/services/page/par/partenaire-service-page-mock-impl";
import { RecherchePartenaireServiceImpl } from "src/services/page/par/par-rpa-service-impl";
import { FicheProduitServiceImpl } from "src/services/page/adm/adm-fpo-service-page-impl";
import { FicheProduitService } from "applitutoriel-js-common/src/services/page/adm/adm-fpo-service-page";
import { SecteurRepartitionProduitServicePageMockImpl } from "applitutoriel-js-common/src/mock/services/page/adm/secteur-repartition-service-page-mock-impl";


if (Utils.config.getOrDefault("mock.enabled", false) && Utils.config.getOrDefault("mock.servicePage.enabled", false)) {
    // Mock des services Page
    Injector.register(AdministrationSecteurService, SecteurServicePageMockImpl);
    Injector.register(FichePartenairePageService, FichePartenaireServicePageMockImpl);
    Injector.register(RecherchePartenaireService, PartenaireServicePageMockImpl);
    Injector.register(FicheProduitService, SecteurRepartitionProduitServicePageMockImpl);

} else {
    Injector.register(AdministrationSecteurService, SecteurServiceImpl);
    Injector.register(FichePartenairePageService, FichePartenaireServiceImpl);
    Injector.register(RecherchePartenaireService, RecherchePartenaireServiceImpl);
    Injector.register(FicheProduitService, FicheProduitServiceImpl);
}