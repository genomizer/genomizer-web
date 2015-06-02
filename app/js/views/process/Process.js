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
        },

        appendProcess: function (e) {
            e.preventDefault();
            console.log("append block");
            var blockType = $("#append_process").val().toLowerCase();
            console.log(blockType);
            var block = undefined;
            switch (blockType) {
                case "rawtoprofile":
                    block = new RawToProfileBlock();
                    break;
                case "smooth":
                    block = new SmoothBlock();
                    break;
                case "step":
                    block = new StepBlock();
                    break;
                case "ratio":
                    block = new RatioBlock();
                    break;
            }
            if (block !== undefined) {
                this.renderBlock(this, block);
            }
        },

        buildJson: function () {
            var json = { expId: this.model.get("expId"), processCommands: [] };
            $('#processes').each(function () {
                var $this = $(this);
                
                $this.find('[id=raw_to_profile_entries]').each(function () {
                    var cmd = { type: 'rawToProfile', files: [] };
                    json.processCommands.push(cmd);
                    var $this = $(this);
                    $this.find('[class=row]').each(function () {
                        var file = {};
                        cmd.files.push(file);
                        var $this = $(this);
                        $this.find('input, select').each(function () {
                            file[this.name] = this.value;
                        });
                        $this.find('[type=checkbox]').each(function () {
                            file[this.name] = this.checked;
                        });
                    });
                });
                
                $this.find('[id=raw_to_profile_entries]').each(function () {
                    var cmd = { type: 'rawToProfile', files: [] };
                    json.processCommands.push(cmd);
                    var $this = $(this);
                    $this.find('[class=row]').each(function () {
                        var file = {};
                        cmd.files.push(file);
                        var $this = $(this);
                        $this.find('input, select').each(function () {
                            file[this.name] = this.value;
                        });
                        $this.find('[type=checkbox]').each(function () {
                            file[this.name] = this.checked;
                        });
                    });
                });
                
                $this.find('[id=raw_to_profile_entries]').each(function () {
                    var cmd = { type: 'rawToProfile', files: [] };
                    json.processCommands.push(cmd);
                    var $this = $(this);
                    $this.find('[class=row]').each(function () {
                        var file = {};
                        cmd.files.push(file);
                        var $this = $(this);
                        $this.find('input, select').each(function () {
                            file[this.name] = this.value;
                        });
                        $this.find('[type=checkbox]').each(function () {
                            file[this.name] = this.checked;
                        });
                    });
                });
                
                $this.find('[id=raw_to_profile_entries]').each(function () {
                    var cmd = { type: 'rawToProfile', files: [] };
                    json.processCommands.push(cmd);
                    var $this = $(this);
                    $this.find('[class=row]').each(function () {
                        var file = {};
                        cmd.files.push(file);
                        var $this = $(this);
                        $this.find('input, select').each(function () {
                            file[this.name] = this.value;
                        });
                        $this.find('[type=checkbox]').each(function () {
                            file[this.name] = this.checked;
                        });
                    });
                });
            });
            console.log(JSON.stringify(json));
        },

        submitProcess: function (e) {
            e.preventDefault();

            this.buildJson();
            // console.log(this.buildJson());

            // var view = this;
            
            // var toSubmit = { expId: this.model.get("expId"), processCommands: [] };

            // this.collection.each(function (cmd) {

            //     var toSubmitCmd = { type: cmd.get("type"), files: [] };

            //     cmd.collection.each(function (file) {
            //         toSubmitCmd.files.push(file);
            //     });

            //     toSubmit.processCommands.push(toSubmitCmd);
            // });

            // console.log(JSON.stringify(toSubmit));

            // new Backbone.Model(toSubmit).save(null, {
            //     url: "/api/process/processCommands",
            //     type: "PUT",
            //     error: function (event, jqxhr) {
            //         app.messenger.warning("Unable to start processing: " + jqxhr.status + " " + jqxhr.responseText);
            //     },
            //     success: function (event, jqxhr) {
            //         app.messenger.success("Successfully started processing.");
            //         view.collection.reset();
            //         view.render();
            //     }
            // });
        },

        renderBlock: function (view, block) {
            block.render();
            view.$('#processes').append(block.el);
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
                    processView.render();
                }
            });
        }
    });
});

