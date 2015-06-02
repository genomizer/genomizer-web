define([
    'text!templates/process/ratio/RatioEntry.html',
], function(ratioEntryTemplate) {
    return Backbone.View.extend({
        TEMPLATE: _.template(ratioEntryTemplate),

        events: {
            "click #close_ratio_entry": "removeEntry",
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
