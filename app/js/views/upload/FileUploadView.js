define([
	'models/File'
],
function(File) {
	var FileUploadView = Backbone.View.extend({
		TEMPLATE: _.template("<%- fileName %>"),
		initialize: function() {
		},
		tagName:'li',
		className:'list-group-item',
		render: function() {
			this.$el.html(this.TEMPLATE(this.model.toJSON()));
		}
	});
	return FileUploadView;
});


