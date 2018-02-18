module.exports = {
    type: "parent",
    authorizedPrerelease: "true",

    gulpTasks: function (gulp, devModules) {
        // Add task if needed
    },
    externalModules: {
        enabled: true,
        directories: ["/home/wmoulin/dev/js/MAE/hornet-js", "/home/wmoulin/dev/js/MAE/hornet-themes-intranet"
        ]
    }

};