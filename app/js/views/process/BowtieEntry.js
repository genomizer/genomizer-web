define([
    'text!templates/process/BowtieEntry.html',
    'models/File'
], function(bowtieEntryTemplate, File) {
    return Backbone.View.extend({
        TEMPLATE: _.template(bowtieEntryTemplate),

        initialize: function(options) {
            this.model = new File();
            this.model.clear();
            this.updateModel();
        },
        events: {
            "change input": "updateModel",
            //"click #close": "updateModel"
        },
        render: function() {
            this.$el.html(this.TEMPLATE());
        },
        updateModel: function() {
            var input = {};
            console.log(this.$("input"));
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
            console.log(this.model);
        }
    });
});

