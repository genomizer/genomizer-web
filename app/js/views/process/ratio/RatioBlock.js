define([
	'text!templates/process/ratio/RatioBlock.html',
    'views/process/ratio/RatioEntry',
    'models/File'
], function(ratioBlockTemplate, RatioEntry, File) {
	return Backbone.View.extend({

		TEMPLATE: _.template(ratioBlockTemplate),
		
		initialize: function(options) {
			this.collection = new Backbone.Collection();
		},
		events: {
			"click #add_ratio_entry": "addEntry",
            "click #close_ratio_block": "removeCommand"
		},
		render: function() {
			this.$el.html(this.TEMPLATE());

			var that = this;
			this.collection.each(function(entry) {
				that.renderModel(that, file);
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
		renderModel: function(view, model) {
			var entryView = new RatioEntry({
				model: model
			});

			entryView.render(this.model.get("files"));
			view.$("#ratio_entries").append(entryView.el);
			entryView.updateModel();
		}
	});
});