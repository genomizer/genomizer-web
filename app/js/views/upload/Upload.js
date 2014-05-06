define([
	'text!templates/upload/Upload.html',
	'views/upload/AddExperiment',
	'views/upload/FileUploadList',
	'collections/Experiments',
	'models/Experiment',
	'collections/Files'
],

function(UploadTemplate,AddExperiment,FileUploadList,Experiments,Experiment,Files) {
	var Upload = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate),
		initialize: function() {
			this.experiments = new Experiments();
			this.experiment = new Experiment();
			this.experiments.add(this.experiment);
			this.files = new Files([],{experiment: this.experiment});
			this.render();
		},
		render: function() {
			this.$el.html(this.TEMPLATE());

		},
		
		events: {
			"click #CreateExperiment": "createExperiment",
			"keyup #existing_experiment_field": "enableAddButton",
			"click #add_button": "addToExistingExperiment",
			"click #saveExperiment": "saveExperiment"
		},
		createExperiment: function() {
			this.$(".experiment-container").show();
			this.$("#upload_form").hide();
			this.addExperiment = new AddExperiment({model:this.experiment});
			this.addExperiment.setElement(this.$el.find("#newAnnotation"));
			this.addExperiment.render();

			this.fileUploadList = new FileUploadList({collection:this.files});
			this.fileUploadList.setElement(this.$el.find("#fileUploadList"));
			this.fileUploadList.render();
		},
		addToExistingExperiment: function() {
			var experimentId = $('#existing_experiment_field').val();
			var that = this;
			this.experiment.set("id",experimentId);
			this.experiment.existingExperiment = true;
			this.experiment.fetch().success(function() {
				that.createExperiment();
			});

		},
		enableAddButton: function() {
			if($('#existing_experiment_field').val().length != 0) {
				$('#add_button').prop('disabled', false);
			} else {
				$('#add_button').prop('disabled', true);
			}
		},
		saveExperiment: function() {
			var that = this;
			this.experiment.save().success(function() {
				files.updateExperimentIds();
				files.fetchAndSaveFiles();
			});
		}
		
		
	   
	});
	return Upload;
});
