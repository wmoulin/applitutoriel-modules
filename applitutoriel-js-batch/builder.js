const path = require("path");
module.exports = {
    type: "application-server",
    authorizedPrerelease: "true",

    gulpTasks: function (gulp, project, conf, helper) {

    },
    externalModules: {
        enabled: true,
        directories: [
            "/home/mouliwi/Dev/workspaceJS/Hornet.js/hornet-js/trunk",
            "/home/mouliwi/Dev/workspaceJS/Hornet.js/hornet-themes-intranet/trunk"
        ]
    },
    config : {
        routesDirs: [ "." + path.sep + "routes" ],
        typescript : { //bin: "~/Dev/node-v4.5.0-linux-x64/lib/node_modules/typescript"
        }
    }

};