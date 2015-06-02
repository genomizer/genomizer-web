define([
    'text!templates/process/step/StepEntry.html',
], function(stepEntryTemplate) {
    return Backbone.View.extend({
        TEMPLATE: _.template(stepEntryTemplate),

        events: {
            "click #close_step_entry": "removeEntry",
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
