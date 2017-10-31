webpackJsonp([9],{

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var hornet_js_utils_1 = __webpack_require__(0);
var ReferentielAction = __webpack_require__(792);
var abstract_routes_1 = __webpack_require__(52);
var roles_1 = __webpack_require__(300);
var urls_1 = __webpack_require__(103);
var ref_pays_service_impl_1 = __webpack_require__(56);
var logger = hornet_js_utils_1.Utils.getLogger("applitutoriel.routes.ref.ref-routes");
var ReferentielRoutesServer = /** @class */ (function (_super) {
    tslib_1.__extends(ReferentielRoutesServer, _super);
    function ReferentielRoutesServer() {
        var _this = _super.call(this) || this;
        _this.addDataRoute(urls_1.URL_REF_VILLES, function () { return new abstract_routes_1.DataRouteInfos(ReferentielAction.ListerVilles, null, ref_pays_service_impl_1.ReferentielPaysServiceImpl); }, roles_1.Roles.ADMIN);
        _this.addDataRoute(urls_1.URL_PAYS, function () { return new abstract_routes_1.DataRouteInfos(ReferentielAction.ListerPays, null, ref_pays_service_impl_1.ReferentielPaysServiceImpl); }, roles_1.Roles.ADMIN);
        _this.addDataRoute(urls_1.URL_REF_NATIONALITE, function () { return new abstract_routes_1.DataRouteInfos(ReferentielAction.ListerNationalites, null, ref_pays_service_impl_1.ReferentielPaysServiceImpl); }, roles_1.Roles.ADMIN);
        _this.addDataRoute(urls_1.URL_REF_NATIONALITE + "/recherche", function () { return new abstract_routes_1.DataRouteInfos(ReferentielAction.ListerNationalites, null, ref_pays_service_impl_1.ReferentielPaysServiceImpl); }, roles_1.Roles.ADMIN, "post");
        return _this;
    }
    return ReferentielRoutesServer;
}(abstract_routes_1.AbstractRoutes));
exports.default = ReferentielRoutesServer;



/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Classe regroupant les rôles disponibles dans l'appli-tuto
 */
var Roles = /** @class */ (function () {
    function Roles() {
    }
    Roles.USER_STR = "APPLI_TUTO_USER";
    Roles.ADMIN_STR = "APPLI_TUTO_ADMIN";
    Roles.USER = [Roles.USER_STR];
    Roles.ADMIN = [Roles.ADMIN_STR];
    Roles.EVERYONE = [Roles.USER_STR, Roles.ADMIN_STR];
    return Roles;
}());
exports.Roles = Roles;



/***/ }),

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(1);
var hornet_js_utils_1 = __webpack_require__(0);
var abstract_routes_1 = __webpack_require__(52);
var logger = hornet_js_utils_1.Utils.getLogger("applitutoriel.actions.ref.ref-actions");
var ListerPays = /** @class */ (function (_super) {
    tslib_1.__extends(ListerPays, _super);
    function ListerPays() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListerPays.prototype.execute = function () {
        return this.getService().listerPays();
    };
    return ListerPays;
}(abstract_routes_1.RouteActionService));
exports.ListerPays = ListerPays;
var ListerVilles = /** @class */ (function (_super) {
    tslib_1.__extends(ListerVilles, _super);
    function ListerVilles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListerVilles.prototype.execute = function () {
        logger.trace("Action: ListerVilles, appel api villes");
        return this.getService().listerVilles();
    };
    return ListerVilles;
}(abstract_routes_1.RouteActionService));
exports.ListerVilles = ListerVilles;
var ListerNationalites = /** @class */ (function (_super) {
    tslib_1.__extends(ListerNationalites, _super);
    function ListerNationalites() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListerNationalites.prototype.execute = function () {
        var payload = {};
        if (this.req.body) {
            payload = this.getPayload();
        }
        return this.getService().rechercherNationalites(payload.nationnalite);
    };
    return ListerNationalites;
}(abstract_routes_1.RouteActionService));
exports.ListerNationalites = ListerNationalites;



/***/ })

});
//# sourceMappingURL=9.js.map