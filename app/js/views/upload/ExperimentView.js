define([
	'text!templates/upload/ExperimentContainer.html',
	'views/upload/AddExperiment',
	'views/upload/FileUploadList'
],

function(ExperimentTemplate,AddExperiment,FileUploadList) {
	var ExperimentView = Backbone.View.extend({
		TEMPLATE: _.template(ExperimentTemplate),
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.TEMPLATE());
		},
		events: {
			
		}
	});

	return ExperimentView;
});
