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

		},
		render: function() {
			this.$el.html(this.TEMPLATE());

			var that = this;
			this.collection.each(function(entry) {
				that.renderModel(that, file);
			});
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