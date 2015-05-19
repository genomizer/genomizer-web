define([
    'text!templates/process/BowtieBlock.html',
    'views/process/BowtieEntry',
    'collections/ProcessFileList',
    'models/File',
], function(bowtieBlockTemplate, BowtieEntry, ProcessFileList, File) {
    return Backbone.View.extend({

        TEMPLATE: _.template(bowtieBlockTemplate),

        initialize: function(options) {
            this.collection = new ProcessFileList();
        },
        events: {
            "click #add_entry": "addEntry",
            "click #close_block": "removeCommand",
        },
        render: function() {
            this.$el.html(this.TEMPLATE());

            var block = this;
            this.collection.each(function (entry) {
                block.renderModel(block, file);
            });
        },
        addEntry: function (e) {
            e.preventDefault();
            var file = new File();
            file.clear();
            file.set("collection", this.collection);
            this.model.collection.add(file);
            this.renderModel(this, file);
        },
        removeCommand: function (e) {
            e.preventDefault();
            this.model.collection.remove(this.model);
            this.el.remove();
        },
        renderModel: function (view, model) {
            var entryView = new BowtieEntry({
                model: model,
                collection: this.collection,
            });
            entryView.render(this.model.get("files"));
            view.$("#bowtie_entries").append(entryView.el);
            entryView.updateModel();
        }
    });
});

