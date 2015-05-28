define([
	'text!templates/process/smooth/SmoothBlock.html',
    'views/process/smooth/SmoothEntry',
    'models/File'
], function(smoothBlockTemplate, SmoothEntry, File) {
	return Backbone.View.extend({

		TEMPLATE: _.template(smoothBlockTemplate),
		
		initialize: function(options) {
			this.collection = new Backbone.Collection();
		},
		events: {
			"click #add_smooth_entry": "addEntry",
            "click #close_smooth_block": "removeCommand"
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
			var entryView = new SmoothEntry({
				model: model
			});

			entryView.render(this.model.get("files"));
			view.$("#smooth_entries").append(entryView.el);
			entryView.updateModel();
		}
	});
});