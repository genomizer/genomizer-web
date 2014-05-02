define([
	'text!templates/upload/Upload.html',
	'views/upload/AddExperiment',
	'views/upload/FileUploadList',
	'collections/Experiments',
	'models/Experiment'
],

function(UploadTemplate,AddExperiment,FileUploadList,Experiments,Experiment) {
	var Upload = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate),
		initialize: function() {
			this.experiments = new Experiments();
			this.experiment = new Experiment();
			this.experiments.add(this.experiment);
			this.render();
		},
		render: function() {
			this.$el.html(this.TEMPLATE());

		},
		
		events: {
			"click #CreateExperiment": "createExperiment",
			"keyup #existing_experiment_field": "showAddButton"
		},
		createExperiment: function() {
			this.fileUploadList = new FileUploadList({experiment:this.experiment});
			this.fileUploadList.setElement(this.$el.find("#fileUploadList"));
			this.fileUploadList.render();

			this.addExperiment = new AddExperiment({model:this.experiment});
			this.addExperiment.setElement(this.$el.find("#newAnnotation"));
			this.addExperiment.render();
		},
		showAddButton: function() {
			if($('#existing_experiment_field').val().length != 0) {
				$('#add_button').prop('disabled', false);
			} else {
				$('#add_button').prop('disabled', true);
			}
		}
		
		
	   
	});
	return Upload;
});
