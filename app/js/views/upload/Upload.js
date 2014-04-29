define([
	'views/upload/FileView',
	'text!templates/upload/Upload.html',
	'models/File'
],

function(FileView,UploadTemplate,File) {
	var Upload = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate + '<section id="file_view"></section>'),
		initialize: function() {
			this.FileView = new FileView();
			this.render();
			this.File = new File();
		},
		el: $("#upload"),
		render: function() {
			this.$el.html(this.TEMPLATE());
			this.FileView.$el = this.$el.find("#file_view");
			this.FileView.render();
		},
		events: {
			"change #inputFile": "display",
			"click #CreateExperiment": "createExperiment"
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
		createExperiment: function() {
			$('#ExperimentButtons').hide();
			$('#input-container').show();
		}
		
	});
	return Upload;
});
