define([
	'text!templates/upload/FileUploadList.html',
	'models/File',
	'collections/Files',
	'views/upload/FileUploadView'
],

function(UploadTemplate,File,Files,FileUploadView) {
	var FileUploadList = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate),
		initialize: function() {
			this.collection = new Files();
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			var that = this;
			this.$el.find(".fileInput").on('change',function() {
				that.addSelectedFiles();
			});
			var $ul = this.$el.find("ul");
			this.collection.each(function(file) {
				var fuv = new FileUploadView({model:file});
				fuv.render();
				$ul.append(fuv.el);
			});
			
		},
		events: {
//			"change .fileInput": "display" FUNKAR EJ :/
		},
		addSelectedFiles: function() {
			var that = this;
			var formFiles = this.$el.find(".fileInput")[0].files;
			_.each(formFiles,function(formFile) {

				var file = new File({
					fileName:formFile.name
				});
				file.fileObj = formFile;

				that.collection.add(file);
			});
			this.render();
		}
		
	});
	return FileUploadList;
});

