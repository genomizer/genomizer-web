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
			this.experiment = new Experiment({id:"<experiment-id>"});
			this.experiments.add(this.experiment);
			this.files = new Files([],{experiment: this.experiment});
			this.render();
		},
		render: function() {
			this.$el.html(this.TEMPLATE());

		},
		
		events: {
			"click #CreateExperiment": "createExperiment",
			"keyup #existing_experiment_field": "showAddButton",
			"click #add_button": "addToExistingExperiment",
			"click #saveExperiment": "saveExperiment"
		},
		createExperiment: function() {
			this.fileUploadList = new FileUploadList({collection:this.files});
			this.fileUploadList.setElement(this.$el.find("#fileUploadList"));
			this.fileUploadList.render();

			this.addExperiment = new AddExperiment({model:this.experiment});
			this.addExperiment.setElement(this.$el.find("#newAnnotation"));
			this.addExperiment.render();
		},
		addToExistingExperiment: function() {
			
			var experimentName = $('#existing_experiment_field').val();
			console.log(experimentName);
			var that = this;
			this.experiment.fetch().success(function() {

				this.addExperiment = new AddExperiment({model:that.experiment});
				this.addExperiment.setElement(that.$el.find("#newAnnotation"));
				this.addExperiment.render();

			});
			this.experiment.existingExperiment = true;

			this.fileUploadList = new FileUploadList({collection:this.files});
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
