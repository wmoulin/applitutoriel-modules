/**
 * Classe regroupant les rôles disponibles dans l'appli-tuto
 */
export class Roles {

    static USER_STR = "APPLI_TUTO_USER";
    static ADMIN_STR = "APPLI_TUTO_ADMIN";

    static USER = [Roles.USER_STR];
    static ADMIN = [Roles.ADMIN_STR];

    static EVERYONE = [Roles.USER_STR, Roles.ADMIN_STR];
}
