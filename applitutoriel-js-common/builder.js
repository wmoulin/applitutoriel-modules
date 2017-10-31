module.exports = {
    type: "module",
    authorizedPrerelease: "true",

    gulpTasks: function (gulp, project, conf, helper) {
        var path = require("path");

        // chemin vers le fichier "definition.d.ts" généré
        conf.generatedTypings.dir = path.join("..", project.name + "-dts");
        conf.generatedTypings.file = project.name + ".d.ts";
    },
    externalModules: {
        enabled: true,
        directories: [
            "/home/mouliwi/Dev/workspaceJS/Hornet.js/hornet-js/trunk",
            "/home/mouliwi/Dev/workspaceJS/Hornet.js/hornet-themes-intranet/trunk"
        ]
    }
};