define([
	   'text!templates/upload/Upload.html',
	   'views/upload/AnnotationsForm',
	   'views/upload/FileUploadList',
	   'views/upload/ExperimentView',
	   'collections/Experiments',
	   'models/Experiment',
	   'collections/Files'
],

function(UploadTemplate,AnnotationsForm,FileUploadList,ExperimentView,Experiments,Experiment,Files) {
	var Upload = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate),
		initialize: function() {
			this.experiments = new Experiments();
			this.experimentViews = [];
			this.enableOnUnloadWarning();
			this.render();
			this.enableAddButton(); // not needed when automatic test value is removed
			$('#uploadAllButton').toggle(false);
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
		},

		events: {
			"click #CreateExperiment": "createExperiment",
			"keyup #existing_experiment_field": "enableAddButton",
			"change #existing_experiment_field": "enableAddButton",
			"submit form#upload_form": "addToExistingExperiment",
			"submit #experiment-form": "saveExperiment",
			"click #uploadAllButton": "uploadAll"
		},
		createExperiment: function() {
			var experiment = new Experiment();
			this.appendNewExperimentView(experiment);
		},
		cloneExperiment: function(clonedAnnotations) {
			var experiment = new Experiment(_.omit(clonedAnnotations.toJSON(),'files','id'));
			this.appendNewExperimentView(experiment);
		},
		removeExperiment: function(experimentView) {
			var index = this.experimentViews.indexOf(experimentView);
			experimentView.el.remove();
			this.experiments.remove(experimentView.model);
			this.experimentViews.splice(index,1);
			this.enableUploadAllButton();
		},
		addToExistingExperiment: function() {
			var denySameExperimentName = false;
			var experimentId = $('#existing_experiment_field').val();

			this.experiments.each(function(exp) {
				if (exp.id == experimentId) {
					app.messenger.warning("The experiment \'" + exp.id + "\' is already open");
					denySameExperimentName = true;
				}
			});

			if(!denySameExperimentName) {
				var that = this;
				var experiment = new Experiment();
				this.experiments.add(experiment);
				experiment.set("id",experimentId);
				experiment.existingExperiment = true;
				experiment.fetch().success(function() {
					that.appendNewExperimentView(experiment);
				});
			}
		
		},
		appendNewExperimentView: function(experiment) {
			var experimentView = new ExperimentView({model: experiment});
			$('#uploadAllButton').toggle(true);
			
			this.listenTo(experimentView,'cloneEvent',this.cloneExperiment);
			this.listenTo(experimentView,'removeEvent',this.removeExperiment);
			
			this.$el.find(".experiment-container").append(experimentView.el);
			this.experimentViews.push(experimentView);
			this.experiments.add(experiment);
			experimentView.render();
			this.enableUploadAllButton();
			experimentView.changeLabelName();
		},
		uploadAll: function() {
			var that = this;
			_.each(this.experimentViews, function(expView) {
				if(!expView.saveExperiment(new Event("uselessEvent"))) {
					var index = that.experimentViews.indexOf(experimentView);
					that.experimentViews.splice(index,1);
				}
			});
		},
		enableUploadAllButton: function() {
			if(this.experiments.hasUploadable()) {
				$('#uploadAllButton').prop('disabled', false);
			} else {
				$('#uploadAllButton').prop('disabled', true);
			}
		},
		enableAddButton: function() {
			if($('#existing_experiment_field').val().length != 0) {
				$('#add_button').prop('disabled', false);
			} else {
				$('#add_button').prop('disabled', true);
			}
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
