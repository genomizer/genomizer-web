define([
    'text!templates/process/smooth/SmoothEntry.html',
], function(smoothEntryTemplate) {
    return Backbone.View.extend({
        TEMPLATE: _.template(smoothEntryTemplate),

        events: {
            "click #close_smooth_entry": "removeEntry",
        },
        render: function(files) {
            this.$el.html(this.TEMPLATE({
                files: files
            }));
        },
        removeEntry: function (e) {
            e.preventDefault();
            this.el.remove();
        }
    });
});
