define([
    "models/File",
], function (File) {
    return Backbone.Collection.extend({

        initialize: function () {
            this.processCommands = [];
        },

        getProcessCommands: function () {
            return this.processCommands;
        },

        addProcessCommand: function (cmd) {
            this.processCommands.push(cmd);
        },

    });
})
