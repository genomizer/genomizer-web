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
            console.log("render block");
            this.$el.html(this.TEMPLATE());

            var block = this;
            this.collection.each(function (entry) {
                var entryView = new BowtieEntry({
                    model: entry,
                    collection: block.collection,
                });
                entryView.render();
                block.$("#bowtie_entries").append(entryView.el);
            });
        },
        addEntry: function () {
            var file = new File({collection: this.collection});
            file.clear();
            this.collection.add(file);
            this.render();
        },
        removeCommand: function () {

            console.log("remove cmd");
            console.log(this.collection);
            this.model.collection.remove(this.model);
            this.el.remove();
        }
    });
});

