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
			
			
			this.render();
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			console.log("the experimentView's $el: ", this.$el);
			
			this.annotationsForm = new AnnotationsForm({model:this.model});
			this.annotationsForm.setElement(this.$el.find(".newAnnotation"));
			

			this.fileUploadList = new FileUploadList({collection:this.model.getFiles()});
			this.fileUploadList.setElement(this.$el.find(".fileUploadList"));
			
			this.annotationsForm.render();
			console.log("rendered annotationsForm: ", this.annotationsForm);
			this.fileUploadList.render();
			console.log("rendered fileUploadList: ", this.fileUploadList);
		},
		getModel: function() {
			return this.model;
		}
		/*events: {
			
		}*/
	});

	return ExperimentView;
});
