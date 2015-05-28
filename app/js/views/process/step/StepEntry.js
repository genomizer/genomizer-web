define([
    'text!templates/process/step/StepEntry.html',
    'models/File'
], function(stepEntryTemplate, File) {
    return Backbone.View.extend({
        TEMPLATE: _.template(stepEntryTemplate),

        initialize: function(options) {
            this.updateModel();
        },
        events: {
            "change input": "updateModel",
            "click #close_step_entry": "removeEntry",
        },
        render: function(files) {
            this.$el.html(this.TEMPLATE({
                files: files
            }));
        },
        updateModel: function() {
            console.log("UpdateModel in StepEntry");
            var input = {};
            this.$("input, select").each(function() {
                var $this = $(this);
                var val = $this.val();
                var placeHolder = $this.attr("placeholder");
                if (val.length == 0 && placeHolder !== undefined) {
                    val = placeHolder;
                }
                input[$this.attr("name")] = val;
            });
            this.model.set(input);
        },
        removeEntry: function (e) {
            e.preventDefault();
            this.collection.remove(this.model);
            this.el.remove();
        }
    });
});