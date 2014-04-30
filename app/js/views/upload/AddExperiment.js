
define([
	'text!templates/upload/Upload.html',
],

function(UploadTemplate) {
	var AddExperiment = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate),
		initialize: function() {

		},
		render: function() {
			this.$el.html("aoeua");
		}
	});
	return AddExperiment;
});
