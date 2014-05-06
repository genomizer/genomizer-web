define(['models/File'],function(File) {
	var Files = Backbone.Collection.extend({
		url: '/api/files',
		model: File,
		initialize:function (models,options) {
			if(options) {
				this.experiment = options.experiment;
			}

		},
		updateExperimentIds: function() {
				var id = this.experiment.id;
				this.each(function(file) {
					file.set("experimentID", id);
				});
		},
		fetchAndSaveFiles: function() {
			this.each(function(file) {
				file.fetchAndUpload();
			});
		}
	});
	return Files;
});
