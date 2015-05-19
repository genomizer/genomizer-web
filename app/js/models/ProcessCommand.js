define([
    "models/File",
    "collections/ProcessFileList",
],
function (File, ProcessFileList) {
    return Backbone.Model.extend({

        initialize: function () {
            this.files = [];
            this.collection = new ProcessFileList();
        },

    });
});
