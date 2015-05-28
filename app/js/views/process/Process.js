define([
    'text!templates/process/Process.html',
    'text!templates/process/rawToProfile/RawToProfileBlock.html',
    'text!templates/process/smooth/SmoothBlock.html',
    'text!templates/process/step/StepBlock.html',
    'text!templates/process/ratio/RatioBlock.html',
    'views/process/rawToProfile/RawToProfileBlock',
    'views/process/smooth/SmoothBlock',
    'views/process/step/StepBlock',
    'views/process/ratio/RatioBlock',
    'models/ProcessCommand',
    'collections/ProcessCommands',
    'collections/sysadmin/GenomeReleaseFiles'
], function(processTemplate,
            rawToProfileBlockTemplate,
            smoothBlockTemplate,
            stepBlockTemplate,
            ratioBlockTemplate,
            RawToProfileBlock,
            SmoothBlock,
            StepBlock,
            RatioBlock,
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
                case "smooth":
                    var cmd = new ProcessCommand({
                        type: "smooth",
                        files: this.files
                    });
                    this.collection.add(cmd);
                    this.renderBlock(this, cmd);
                    break;
                case "step":
                    var cmd = new ProcessCommand({
                        type: "step",
                        files: this.files
                    });
                    this.collection.add(cmd);
                    this.renderBlock(this, cmd);
                    break;
                case "ratio":
                    var cmd = new ProcessCommand({
                        type: "ratio",
                        files: this.files
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
                case "smooth":
                    var smoothBlock = new SmoothBlock({
                        model: block,
                        collection: view.collection
                    });
                    smoothBlock.render();
                    view.$("#processes").append(smoothBlock.el);
                    break;
                case "step":
                    var stepBlock = new StepBlock({
                        model: block,
                        collection: view.collection
                    });
                    stepBlock.render();
                    view.$("#processes").append(stepBlock.el);
                    break;
                case "ratio":
                    console.log("herroooo ratio");
                    var ratioBlock = new RatioBlock({
                        model: block,
                        collection: view.collection
                    });
                    ratioBlock.render();
                    view.$("#processes").append(ratioBlock.el);
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

