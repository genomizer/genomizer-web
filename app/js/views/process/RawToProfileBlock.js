define([
    'text!templates/process/RawToProfileBlock.html',
    'views/process/RawToProfileEntry',
    'models/File',
], function(rawToProfileBlockTemplate, RawToProfileEntry, File) {
    return Backbone.View.extend({

        TEMPLATE: _.template(rawToProfileBlockTemplate),

        initialize: function(options) {
            this.collection = new Backbone.Collection();
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
            this.model.collection.add(file);
            this.renderModel(this, file);
        },
        removeCommand: function (e) {
            e.preventDefault();
            this.model.collection.remove(this.model);
            this.el.remove();
        },
        renderModel: function (view, model) {
            var entryView = new RawToProfileEntry({
                model: model,
                collection: this.collection,
            });
            entryView.render(
                 this.model.get("files"), 
                 this.model.get("grs").models.map(function (gr) {
                     return gr.get("genomeVersion");
                 })
            );
            view.$("#raw_to_profile_entries").append(entryView.el);
            entryView.updateModel();
        }
    });
});
