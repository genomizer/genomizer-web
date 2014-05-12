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
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
		},
	
		events: {
			"click #CreateExperiment": "createExperiment",
			"keyup #existing_experiment_field": "enableAddButton",
			"change #existing_experiment_field": "enableAddButton",
			"click #add_button": "addToExistingExperiment",
			"submit #experiment-form": "saveExperiment"
		},
		createExperiment: function() {
			var experiment = new Experiment();
			this.appendNewExperimentView(experiment);
		},
		addToExistingExperiment: function() {
			var experimentId = $('#existing_experiment_field').val();
			var that = this;
			var experiment = new Experiment();
			this.experiments.add(experiment);
			experiment.set("id",experimentId);
			experiment.existingExperiment = true;
			experiment.fetch().success(function() {
				that.appendNewExperimentView(experiment);
			});
		},
		appendNewExperimentView: function(experiment) {
			var experimentView = new ExperimentView({model: experiment});
			this.$el.find(".experiment-container").append(experimentView.el);
			this.experimentViews.push(experimentView);
			this.experiments.add(experiment);
			experimentView.render();
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
				// API test
				this.experiment.unset("files");
				//var annots = this.experiment.get("annotations");
				//annots = _.map(annots,function(an) {
				//	return _.omit(an,'id');
				//});
				this.experiment.set("annotations",[{id:1,name:"Development Stage",value:"aster"}]);
				this.experiment.set("createdBy","jonas");
				this.experiment.set("name","webb-"+Date.now());
				this.experiment.save(null,{success:function() {
					that.files.updateExperimentIds();
					that.files.fetchAndSaveFiles();
				}
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
