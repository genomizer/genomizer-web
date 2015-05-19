define([
    'text!templates/processModal/Process.html',
    'text!templates/process/BowtieBlock.html',
    'views/process/BowtieBlock',
    'models/ProcessCommand',
    'collections/ProcessCommands'
], function(processTemplate, bowtieBlockTemplate, BowtieBlock, ProcessCommand, ProcessCommands) {

    return Backbone.View.extend({

        TEMPLATE: _.template(processTemplate),

        initialize: function(options) {
            this.collection.set({expId: "not_and_expId"});
            this.render();
        },

        events: {
            'click #append_process_btn' : 'appendProcess',
        },

        render: function() {
            this.$el.html(this.TEMPLATE());

            var processView = this;
            var collection = this.collection;
            this.collection.each(function (cmd) {
                var bowtieBlock = new BowtieBlock({
                    model: cmd, 
                    collection: collection,
                });
                bowtieBlock.render();
                processView.$("#processes").append(bowtieBlock.el);
            });
            console.log(this.collection.toJSON());
        },

        appendProcess: function () {
            var blockType = $("#append_process").val().toLowerCase();
            console.log("add cmd");
            console.log(this.collection);
            switch (blockType) {
                case "bowtie":
                    this.collection.add(new ProcessCommand({type: blockType}));
                    break;
                case "ratio":
                    console.log("append ratio block");
                    break;
            }
            console.log(this.collection);
            this.render();
        },
    });
});

