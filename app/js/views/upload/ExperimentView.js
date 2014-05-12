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
			
			if (this.model == undefined) {
				console.log("created new empty experiment");
				this.model = new Experiment();
			}
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			
			this.annotationsForm = new AnnotationsForm({model:this.model});
			this.annotationsForm.setElement(this.$el.find(".newAnnotation"));
			

			this.fileUploadList = new FileUploadList({collection:this.model.getFiles()});
			this.fileUploadList.setElement(this.$el.find(".fileUploadList"));
			
			this.annotationsForm.render();
			this.fileUploadList.render();
		}
	});

	return ExperimentView;
});
