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
			this.enableOnUnloadWarning();
			this.render();
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
		},
	
		events: {
			"click #CreateExperiment": "createExperiment",
			"keyup #existing_experiment_field": "enableAddButton",
			"click #add_button": "addToExistingExperiment",
			"submit #experiment-form": "saveExperiment"
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
					return "You have file(s) that is not finished uploading!";
				}
			});
		}
	});
	return Upload;
});
