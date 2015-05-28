define([
    'text!templates/process/Process.html',
    'text!templates/process/RawToProfileBlock.html',
    'views/process/RawToProfileBlock',
    'models/ProcessCommand',
    'collections/ProcessCommands',
    'collections/sysadmin/GenomeReleaseFiles',
], function(processTemplate,
            rawToProfileBlockTemplate,
            RawToProfileBlock,
            ProcessCommand,
            ProcessCommands,
            GenomeReleaseFiles) {

    return Backbone.View.extend({

        TEMPLATE: _.template(processTemplate),

        initialize: function() {
            this.files = [];
            this.fetchFileNamesAndGRs();
        },

        events: {
            'click #append_process_btn' : 'appendProcess',
            "click #submit": "submitProcess",
        },

        render: function() {
            this.$el.html(this.TEMPLATE());
            
            var processView = this;
            this.collection.each(function (cmd) {
                processView.renderBlock(processView, cmd);
            });
        },

        appendProcess: function (e) {
            e.preventDefault();
            console.log("append block");
            var blockType = $("#append_process").val().toLowerCase();
            console.log(blockType);
            switch (blockType) {
                case "rawtoprofile":
                    var cmd = new ProcessCommand({
                        type: "rawToProfile",
                        files: this.files,
                        grs: this.model.get("grs"),
                    });
                    this.collection.add(cmd);
                    this.renderBlock(this, cmd);
                    break;
                case "ratio":
                    console.log("append ratio block");
                    var cmd = new ProcessCommand({
                        type: "ratio",
                        files: this.files,
                        //grs: this.model.get("grs")
                    });
                    this.collection.add(cmd);
                    this.renderBlock(this, cmd);
                    break;
            }
        },

        submitProcess: function (e) {
            e.preventDefault();
            var view = this;
            
            var toSubmit = { expId: this.model.get("expId"), processCommands: [] };

            this.collection.each(function (cmd) {

                var toSubmitCmd = { type: cmd.get("type"), files: [] };

                cmd.collection.each(function (file) {
                    toSubmitCmd.files.push(file);
                });

                toSubmit.processCommands.push(toSubmitCmd);
            });

            console.log(JSON.stringify(toSubmit));

            new Backbone.Model(toSubmit).save(null, {
                url: "/api/process/processCommands",
                type: "PUT",
                error: function (event, jqxhr) {
                    // app.messenger.warning("Unable to start processing: " + jqxhr.status + " " + jqxhr.responseText);
                },
                success: function (event, jqxhr) {
                    app.messenger.success("Successfully started processing.");
                    view.collection.reset();
                    view.render();
                },
            });
        },

        renderBlock: function (view, block) {
            switch (block.get("type")) {
                case "rawToProfile":
                    var rawToProfileBlock = new RawToProfileBlock({
                        model: block, 
                        collection: view.collection,
                    });
                    rawToProfileBlock.render();
                    view.$("#processes").append(rawToProfileBlock.el);
                    console.log("Raw to profile");
                    break;
                case "ratio":
                    console.log("ratio");
                    break;
            }
        },

        fetchFileNamesAndGRs: function () {
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
                    processView.fetchGRs();
                }
            });
        },

        fetchGRs: function () {
            var processView = this;
            var genomeReleaseFiles = new GenomeReleaseFiles();
            this.model.set("grs", genomeReleaseFiles);
            genomeReleaseFiles.fetch({
                "url": "/api/genomeRelease",
                error: function () {
                    console.log("error while getting genome releases");
                },
                success: function (model, response) {
                    app.debug = model;
                    processView.render();
                }
            });
        },
    });
});

