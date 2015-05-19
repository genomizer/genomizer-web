define([
    'text!templates/processModal/BowtieBlock.html',
    'views/processModal/BowtieEntry'
], function(bowtieBlockTemplate, BowtieEntry) {
    return Backbone.View.extend({

        TEMPLATE: _.template(bowtieBlockTemplate),

        initialize: function(options) {
            this.entries = [];
        },
        events: {
            "click #add_entry": "addEntry",
            "click #close": "removeCommand",
        },
        render: function() {
            console.log("render block");
            this.$el.html(this.TEMPLATE());

            var block = this;
            this.entries.forEach(function (entry) {
                entry.render();
                block.$("#bowtie_entries").append(entry.el);
            });
        },
        addEntry: function () {
            this.entries.push(new BowtieEntry());
            this.render();
        },
        removeCommand: function () {
            this.collection.remove(this.model);
        }
    });
});

