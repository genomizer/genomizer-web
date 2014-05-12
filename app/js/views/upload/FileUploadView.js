define([
	'models/File',
	'text!templates/upload/FileUploadView.html'
],
function(File,FileUploadTemplate) {
	var FileUploadView = Backbone.View.extend({
		TEMPLATE: _.template(FileUploadTemplate),
		PROGRESS_TEMPLATE:_.template('<div class="progress-bar <%- done ? "progress-bar-success" : "" %>" role="progressbar" aria-valuenow="<%- progress %>" aria-valuemin="0" aria-valuemax="100" style="width: <%- progress %>%;"></div>'),
		initialize: function() {
			this.model.on("uploadProgress",this.renderProgress,this);
		},
		tagName:'li',
		className:'list-group-item',
		events: {
			'change select': 'changeSelect',
			'click #removeFile': 'removeFileFunction' 
		},
		render: function() {
			this.$el.html(this.TEMPLATE(this.model.toJSON()));
			this.renderProgress();
		},
		renderProgress: function() {
			this.$(".progress").html(this.PROGRESS_TEMPLATE({
				progress: Math.round(this.model.progress*100),
				done:this.model.uploadDone
			}));
		},
		changeSelect: function() {
			this.model.set("type",this.$("select").val());
		},
		removeFileFunction: function() {
			this.el.remove();
			this.model.collection.remove(this.model);
		}
	});
	return FileUploadView;
});


