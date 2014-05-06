define([
	'models/File'
],
function(File) {
	var FileUploadView = Backbone.View.extend({
		TEMPLATE: _.template('<%- fileName %> \
							 <select id="selector" class="form-control"><option value=raw >Raw</option><option value=profile >Profile</option><option value=region >Region</option></select> \
							 <div class="progress"></div>'),
		PROGRESS_TEMPLATE:_.template('<div class="progress-bar <%- done ? "progress-bar-success" : "" %>" role="progressbar" aria-valuenow="<%- progress %>" aria-valuemin="0" aria-valuemax="100" style="width: <%- progress %>%;"></div>'),
		initialize: function() {
			this.model.on("uploadProgress",this.renderProgress,this);
		},
		tagName:'li',
		className:'list-group-item',
		events: {
			'change select': 'changeSelect'
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
		}
	});
	return FileUploadView;
});


