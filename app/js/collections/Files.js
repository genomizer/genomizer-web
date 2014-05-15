define(['models/File'],function(File) {
	var Files = Backbone.Collection.extend({
		url: app.BASE_URL + 'files',
		model: File,
		initialize:function (models,options) {
			if(options) {
				this.experiment = options.experiment;
			}

		},
		updateExperimentIds: function(id) {
			this.each(function(file) {
				file.set("experimentID", id);
			});
		},
		fetchAndSaveFiles: function() {
			this.each(function(file) {
				file.fetchAndUpload();
			});
		},
		hasUnfinishedUploads: function() {
			var nrOfFinnishedFiles = 0;
			this.each(function(file) {
				if(file.uploadDone) {
					nrOfFinnishedFiles++;
				}
			});
			return nrOfFinnishedFiles != this.length
		},
		/*
		 * Adds File Models to the collection by using a fileObject list (as in
		 * javascript file object)
		 */
		addFilesByFileObject: function(fileObjects) {
			var that = this;
			_.each(fileObjects,function(fileObj) {
				var file = new File({
					fileName:fileObj.name
				});
				file.fileObj = fileObj;

				that.add(file);
			});

		}
	});
	return Files;
});
