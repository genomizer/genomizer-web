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
			var aNotDoneUpload = this.find(function(f) {
				return !f.uploadDone;
			});
			return aNotDoneUpload !== undefined
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

		},
		/*
		 * returns the total size of the files to be uploaded
		 */
		getTotalUploadFileSize: function() {
			var size = 0;
			this.each(function(f) {
				if(f.isFileUpload()) {
					size += f.getFileSize();
				}
			});
			return size;
			
		},
		/*
		 * Get the total upload progress as a value between 0 and 1
		 */
		getTotalUploadProgress: function() {
			if(this.getTotalUploadFileSize() == 0) {
				return 1;
			}
			var uploadedSize = 0;
			this.each(function(f) {
				if(f.isFileUpload()) {
					uploadedSize += f.getFileSize() * f.progress;
				}
			});
			return uploadedSize / this.getTotalUploadFileSize();
		}
	});
	return Files;
});
