define([
    'text!templates/process/rawToProfile/RawToProfileEntry.html',
    'models/File'
], function(rawToProfileEntryTemplate, File) {
    return Backbone.View.extend({
        TEMPLATE: _.template(rawToProfileEntryTemplate),

        events: {
            "click #close_raw_to_profile_entry": "removeEntry"
        },
        render: function(genomeVersions) {
            this.$el.html(this.TEMPLATE({
                genomeVersions: genomeVersions,
            }));
        },
        removeEntry: function (e) {
            e.preventDefault();
            this.el.remove();
        }
    });
});

