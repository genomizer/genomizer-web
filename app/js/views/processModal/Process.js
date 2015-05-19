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
            this.render();
        },

        events: {
            'click #append_process_btn' : 'appendProcess',
            "click #submit": "submitProcess",
        },

        render: function() {
            this.$el.html(this.TEMPLATE());

            var processView = this;
            var collection = this.collection;
            this.collection.each(function (cmd) {
                renderBlock(processView, cmd);
            });
        },

        appendProcess: function (e) {
            e.preventDefault();
            var blockType = $("#append_process").val().toLowerCase();
            switch (blockType) {
                case "bowtie":
                    var cmd = new ProcessCommand({type: blockType});
                    this.collection.add(cmd);
                    this.renderBlock(this, cmd);
                    break;
                case "ratio":
                    console.log("append ratio block");
                    break;
            }
        },

        submitProcess: function (e) {

            var view = this;

            e.preventDefault();
            
            var toSubmit = {
                expId: "not_an_expid", 
                processCommands: []
            };

            this.collection.each(function (cmd) {
                console.log(cmd);
                cmd.files = [];

                var toSubmitCmd = {
                    type: cmd.get("type"),
                    files: [],
                };

                cmd.collection.each(function (file) {
                    toSubmitCmd.files.push(file);
                });

                toSubmit.processCommands.push(toSubmitCmd);
            });
            console.log(JSON.stringify(toSubmit));

            new Backbone.Model(toSubmit).save(null, {
                url: "/api/process/",
                type: "PUT",
                error: function (event, jqxhr) {
                    console.log("ERROR: " + jqxhr.status + " " + jqxhr.responseText);
                },
                success: function (event, jqxhr) {
                    console.log("SUCCESSSSSS: " + jqxhr.status + " " + jqxhr.responseText);
                    view.collection.reset();
                    view.render();
                },
            });
        },

        renderBlock: function (view, block) {
            var bowtieBlock = new BowtieBlock({
                model: block, 
                collection: view.collection,
            });
            bowtieBlock.render();
            view.$("#processes").append(bowtieBlock.el);            
        },
    });
});

