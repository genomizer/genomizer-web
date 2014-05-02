define([
	'models/File'
],
function(File) {
	var FileUploadView = Backbone.View.extend({
		TEMPLATE: _.template('<%- fileName %> \
							 <div class="progress"></div>'),
		PROGRESS_TEMPLATE:_.template('<div class="progress-bar" role="progressbar" aria-valuenow="<%- progress %>" aria-valuemin="0" aria-valuemax="100" style="width: <%- progress %>%;"></div>'),
		initialize: function() {
			this.model.on("uploadProgress",this.renderProgress,this);
		},
		tagName:'li',
		className:'list-group-item',
		render: function() {
			this.$el.html(this.TEMPLATE(_.extend({},this.model.toJSON())));
			this.renderProgress();
		},
		renderProgress: function() {
			this.$(".progress").html(this.PROGRESS_TEMPLATE({progress: Math.round(this.model.progress*100)}));
		}
	});
	return FileUploadView;
});


