define(['models/File'],function(File) {
	var Files = Backbone.Collection.extend({
		url: '/api/files',
		model: File,
		initialize:function () {
		}

	});
	return Files;
});
