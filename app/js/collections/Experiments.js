define(['models/Experiment'],function(Experiment) {
	var Experiments = Backbone.Collection.extend({
		url: app.BASE_URL + 'experiment',
		model: Experiment,
		initialize:function () {
		},
		hasUploadable: function() {
			var aUpload = this.find(function(f) {
				return f.isUploadable();
			});
			return aUpload !== undefined
		}
	});
	return Experiments;
});
