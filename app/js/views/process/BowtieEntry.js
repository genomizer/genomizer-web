define([
    'text!templates/process/BowtieEntry.html',
    'models/File'
], function(bowtieEntryTemplate, File) {
    return Backbone.View.extend({
        TEMPLATE: _.template(bowtieEntryTemplate),

        initialize: function(options) {
            this.updateModel();
        },
        events: {
            "change input": "updateModel",
            "click #close_entry": "removeEntry",
        },
        render: function() {
            this.$el.html(this.TEMPLATE());
        },
        updateModel: function() {
            var input = {};
            this.$("input").each(function() {
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
        },
    });
});

