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

		},
		render: function() {
			this.$el.html(this.TEMPLATE());

			var that = this;
			this.collection.each(function(entry) {
				that.renderModel(that, file);
			});
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