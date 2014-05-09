define([
	'text!templates/upload/Upload.html',
	'views/upload/AddExperiment',
	'views/upload/FileUploadList',
	'views/upload/ExperimentView',
	'collections/Experiments',
	'models/Experiment',
	'collections/Files'
],

function(UploadTemplate,AddExperiment,FileUploadList,ExperimentView,Experiments,Experiment,Files) {
	var Upload = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate),
		initialize: function() {
			this.experiments = new Experiments();
			this.experiment; // should this new be here?
			//this.experiments.add(this.experiment);
			//this.files = new Files([],{experiment: this.experiment});
			this.experimentViews = [];
			this.enableOnUnloadWarning();
			this.render();
			this.enableAddButton(); // not needed when automatic test value is removed
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			for (var ev in this.experimentViews) {
				ev.render();
			}
		},
	
		events: {
			"click #CreateExperiment": "createExperiment",
			"keyup #existing_experiment_field": "enableAddButton",
			"change #existing_experiment_field": "enableAddButton",
			"click #add_button": "addToExistingExperiment",
			"submit #experiment-form": "saveExperiment"
		},
		createExperiment: function() {
			var experimentView = new ExperimentView({model: this.experiment});
			experimentView.setElement(this.$el.find(".experiment-container"));
			this.experimentViews.push(experimentView);
			this.experiments.add(experimentView.getModel());
			//experimentView.render();
		},
		addToExistingExperiment: function() {
			var experimentId = $('#existing_experiment_field').val();
			var that = this;
			this.experiment = new Experiment();
			this.experiments.add(this.experiment);
			this.experiment.set("id",experimentId);
			this.experiment.existingExperiment = true;
			this.experiment.fetch().success(function() {
				console.log("creating existing experiment: ", this.experiment);
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
		saveExperiment: function(e) {
			e.preventDefault();
			var that = this;
			this.experiment.save().success(function() {
				files.updateExperimentIds();
				files.fetchAndSaveFiles();
			});
		},
		enableOnUnloadWarning: function() {
			var that = this;
			$(window).bind('beforeunload',function() {
				if(that.files.hasUnfinishedUploads()) {
					return "You have file(s) that are not finished uploading!";
				}
			});
		}
	});
	return Upload;
});
