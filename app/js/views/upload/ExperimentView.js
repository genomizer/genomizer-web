define([
	'text!templates/upload/ExperimentContainer.html',
	'views/upload/AnnotationsForm',
	'views/upload/FileUploadList',
	'models/Experiment'
],

function(ExperimentTemplate,AnnotationsForm,FileUploadList,Experiment) {
	var ExperimentView = Backbone.View.extend({
		TEMPLATE: _.template(ExperimentTemplate),
		initialize: function() {
		},
		events: {
			"submit #experiment-form": "saveExperiment",
			"click #removeExperiment": "removeExperiment"
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			
			this.annotationsForm = new AnnotationsForm({model:this.model});
			this.annotationsForm.setElement(this.$el.find(".newAnnotation"));
			

			this.fileUploadList = new FileUploadList({collection:this.model.getFiles()});
			this.fileUploadList.setElement(this.$el.find(".fileUploadList"));
			
			this.annotationsForm.render();
			this.fileUploadList.render();
		},
		removeExperiment: function() {
			this.el.remove();
			this.model.collection.remove(this.model);
		},
		saveExperiment: function(e) {
			e.preventDefault();
			var that = this;
			// API test
			this.model.unset("files");
			//var annots = this.model.get("annotations");
			//annots = _.map(annots,function(an) {
			//	return _.omit(an,'id');
			//});
			//this.model.set("annotations",[{id:8,name:"Development Stage",value:"aster"}]);
			//this.model.set("createdBy","jonas");
			//this.model.set("name","webb-"+Date.now());
			this.model.save(null,{success:function() {
				that.model.updateExperimentIdsForFiles();
				that.model.files.fetchAndSaveFiles();
			}
			});
		}

	});

	return ExperimentView;
});
