
define([
	'text!templates/upload/AnnotationsForm.html',
],

function(UploadTemplate) {
	var AddExperiment = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate),
		initialize: function() {

		},
		render: function() {
			this.$el.html(this.TEMPLATE({
				annotations: app.annotationTypes.withoutExpID().toJSON(),
				experiment:this.model.toJSON(),
				existingExperiment:this.model.existingExperiment
			}));
			this.updateModel();
		},
		events: {
			"change input":"updateModel",
			"change select":"updateModel",
			"change input": "changeLabelName"
		},
		changeLabelName: function() {
			alert(this.$el.find("experiment name").val());
		},

		updateModel:function() {
			var input = {};
			this.$el.find("input, select").each(function() {
				var $this = $(this);
				input[$this.attr("name")] = $this.val();
			});

			var annot = [];
			app.annotationTypes.withoutExpID().each(function(at) {
				annot.push({
					id:at.id,
					name:at.get("name"),
					value:input[at.get("name")] 
				})
			});
			this.model.set({"annotations":annot,"name":input["Experiment name"],"createdBy":input["Created by"]});
		}
		
	});

	return AddExperiment;
});
