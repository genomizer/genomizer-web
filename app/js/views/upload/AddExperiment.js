
define([
	'text!templates/upload/Experiment.html',
],

function(UploadTemplate) {
	var AddExperiment = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate),
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.TEMPLATE({annotations: app.annotationTypes.toJSON()}));
		},
		events: {
			
		}
		
	});

	return AddExperiment;
});
