define([
    'text!templates/processModal/Process.html',
    'text!templates/process/BowtieBlock.html',
    'views/process/BowtieBlock',
    'models/ProcessCommand',
    'collections/ProcessCommands'
], function(processTemplate, bowtieBlockTemplate, BowtieBlock, ProcessCommand, ProcessCommands) {

    return Backbone.View.extend({

        TEMPLATE: _.template(processTemplate),

        initialize: function() {
            this.files = [];
            this.fetchFileNames();
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
                processView.renderBlock(processView, cmd);
            });
        },

        appendProcess: function (e) {
            e.preventDefault();
            var blockType = $("#append_process").val().toLowerCase();
            switch (blockType) {
                case "bowtie":
                    var cmd = new ProcessCommand({
                        type: blockType,
                        files: this.files,
                        genomeVersions: app.genomeReleaseFiles
                    });
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
                cmd.files = [];

                var toSubmitCmd = {
                    type: cmd.get("type"),
                    files: [],
                };

                cmd.collection.each(function (file) {
                    // file.set("collection", undefined);
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

        fetchFileNames: function () {
            var processView = this;
            this.model.fetch({
                "url": "/api/experiment/" + this.model.get("expId"),
                error: function () {
                    console.log("error while getting files for experiment");
                },
                success: function (model, response) {
                    response.files.forEach(function (file) {
                        processView.files.push(file["filename"]);
                    })
                    processView.render();
                }
            });
        }
    });
});

