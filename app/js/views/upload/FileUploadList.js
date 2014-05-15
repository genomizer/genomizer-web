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
			this.collection.on("add remove",this.render,this);
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			var that = this;
			var $ul = this.$el.find("ul");
			this.collection.each(function(file) {
				var fuv = new FileUploadView({model:file});
				fuv.render();
				$ul.append(fuv.el);
			});
			
		},
		events: {
			"change .fileInput": "addSelectedFiles"
		},
		addSelectedFiles: function() {
			var formFiles = this.$el.find(".fileInput")[0].files;
			this.collection.addFilesByFileObject(formFiles);
		}
		
	});
	return FileUploadList;
});

