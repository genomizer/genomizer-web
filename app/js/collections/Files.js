define(['models/File'],function(File) {
	var Files = Backbone.Collection.extend({
		url: '/api/file',
		model: File,
		initialize:function () {
		}

	});
	return Files;
});
