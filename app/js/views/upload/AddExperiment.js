
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
			"change input":"updateModel",
			"change select":"updateModel"
		},
		updateModel:function() {
			var input = {};
			this.$el.find("input, select").each(function() {
				var $this = $(this);
				input[$this.attr("name")] = $this.val();
			});

			var annot = [];
			app.annotationTypes.each(function(at) {
				if(input[at.get("name")] !== undefined) {
					annot.push({
						id:at.id,
						name:at.get("name"),
						value:input[at.get("name")] 
					})
				}
			});
			this.model.set("annotation",annot);
		}
		
	});

	return AddExperiment;
});
