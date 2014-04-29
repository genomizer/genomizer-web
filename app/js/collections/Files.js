define(['models/File'],function(Experiment) {
	var Files = Backbone.Collection.extend({
		url: '/api/file',
		model: File,
		initialize:function () {
		}

	});
	return Files;
});
