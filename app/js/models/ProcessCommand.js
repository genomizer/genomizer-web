define([
    "models/File",
],
function (File) {
    return Backbone.Model.extend({
        initialize: function () {
            this.files = [];
            this.collection = new Backbone.Collection();
        },
    });
});
