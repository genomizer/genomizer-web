define(['text!templates/upload/Upload.html'],function(UploadTemplate) {
	var Upload = Backbone.View.extend({
		template: _.template(UploadTemplate),
		initialize: function() {
			this.render();
		},
		render: function() {
			this.$el.html(this.template());
		}
		
	});
	return Upload;
});
