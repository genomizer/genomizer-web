define([
	'views/upload/FileView',
	'text!templates/upload/Upload.html',
	'models/File',
	'views/upload/AddExperiment',
	'views/upload/FileUploadList'
],

function(FileView,UploadTemplate,File,AddExperiment,FileUploadList) {
	var Upload = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate),
		initialize: function() {
			this.FileView = new FileView();
			this.File = new File();
			this.render();
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			this.FileView.$el = this.$el.find("#file_view");
			this.FileView.render();



			this.addExperiment = new AddExperiment();
			this.addExperiment.setElement(this.$el.find("#newAnnotation"));
			this.addExperiment.render();


			this.fileUploadList = new FileUploadList();
			this.fileUploadList.setElement(this.$el.find("#fileUploadList"));
			this.fileUploadList.render();
		},
		events: {
			"change #inputFile": "display",
			"click #CreateExperiment": "CreateExperiment"

		},
		display: function() {
			var files = $("#inputFile")[0].files;
			var FileArray = [];
			for (var i = 0; i < files.length; i++) {
				
				//console.log(files[i].name);
				this.File.filename = files[i].name;
				this.File.size = (files[i].size);	
				//console.log(this.File.filename);
				FileArray.push(this.File);
			}
			for (var i = 0; i < files.length; i++) {
				console.log(FileArray[i].filename);
				console.log(FileArray[i].size);
			}
		},

		CreateExperiment: function() {

			this.addExperiment.$el = this.$el.find("#newAnnotation");
			this.addExperiment.render();
		}
		
	});
	return Upload;
});
