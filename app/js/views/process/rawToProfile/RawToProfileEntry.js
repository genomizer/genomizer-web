define([
    'text!templates/process/rawToProfile/RawToProfileEntry.html',
    'models/File'
], function(rawToProfileEntryTemplate, File) {
    return Backbone.View.extend({
        TEMPLATE: _.template(rawToProfileEntryTemplate),

        events: {
            "click #close_raw_to_profile_entry": "removeEntry"
        },
        render: function(files, genomeVersions) {
            this.$el.html(this.TEMPLATE({
                files: files,
                genomeVersions: genomeVersions
            }));
        },
        // updateModel: function() {
        //     var input = {};
        //     this.$("input, select").each(function() {
        //         var $this = $(this);
        //         var val = $this.val();
        //         var placeHolder = $this.attr("placeholder");
        //         if (val.length == 0 && placeHolder !== undefined) {
        //             val = placeHolder;
        //         }
        //         input[$this.attr("name")] = val;
        //     });
        //     this.model.set(input);
        // },
        removeEntry: function (e) {
            e.preventDefault();
            this.el.remove();
        }
    });
});

