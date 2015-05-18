define([
    'text!templates/processModal/BowtieEntry.html'
], function(bowtieEntryTemplate) {
    return Backbone.View.extend({
        TEMPLATE: _.template(bowtieEntryTemplate),

        initialize: function(options) {
        },
        events: {
        },
        render: function() {
            this.$el.html(this.TEMPLATE());
        }
    });
});

