define([
	'text!templates/upload/ExperimentContainer.html',
	'views/upload/AddExperiment',
	'views/upload/FileUploadList',
	'models/Experiment'
],

function(ExperimentTemplate,AddExperiment,FileUploadList,Experiment) {
	var ExperimentView = Backbone.View.extend({
		TEMPLATE: _.template(ExperimentTemplate),
		initialize: function() {
			
			if (this.model == undefined) {
				console.log("hej");
				this.model = new Experiment();
			}
			
			
			this.render();
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			
			this.addExperiment = new AddExperiment({model:this.model});
			this.addExperiment.setElement(this.$el.find(".newAnnotation"));
			

			this.fileUploadList = new FileUploadList({collection:this.model.getFiles()});
			this.fileUploadList.setElement(this.$el.find(".fileUploadList"));
			
			this.addExperiment.render();
			this.fileUploadList.render();
		},
		getModel: function() {
			return this.model;
		}
		/*events: {
			
		}*/
	});

	return ExperimentView;
});
