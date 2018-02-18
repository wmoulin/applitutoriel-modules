const path = require("path");
module.exports = {
    type: "application-server",
    authorizedPrerelease: "true",

    gulpTasks: function (gulp, project, conf, helper) {

    },
    externalModules: {
        enabled: true,
        directories: ["/home/wmoulin/dev/js/MAE/hornet-js", "/home/wmoulin/dev/js/MAE/hornet-themes-intranet"
        ]
    },
    config : {
        routesDirs: [ "." + path.sep + "routes" ],
        typescript : { //bin: "~/Dev/node-v4.5.0-linux-x64/lib/node_modules/typescript"
        }
    }

};