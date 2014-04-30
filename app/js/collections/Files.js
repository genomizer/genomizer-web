define(['models/File'],function(Experiment) {
	var Files = Backbone.Collection.extend({
		url: '/api/files',
		model: File,
		initialize:function () {
		}

	});
	return Files;
});
