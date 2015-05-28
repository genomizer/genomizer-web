define([
	'text!templates/process/step/StepBlock.html',
    'views/process/step/StepEntry',
    'models/File'
], function(stepBlockTemplate, StepEntry, File) {
	return Backbone.View.extend({

		TEMPLATE: _.template(stepBlockTemplate),
		
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
			var entryView = new StepEntry({
				model: model
			});

			entryView.render(this.model.get("files"));
			view.$("#step_entries").append(entryView.el);
			entryView.updateModel();
		}
	});
});