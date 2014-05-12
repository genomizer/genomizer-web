define(['models/File'],function(File) {
	var Files = Backbone.Collection.extend({
		url: 'http://scratchy.cs.umu.se:8000/api/files',
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
				if(file.uploadDone == true) {
					nrOfFinnishedFiles++;
				}
			});
			if(nrOfFinnishedFiles == this.length) {
				return false;
			} else {
				return true;
			}
		}
	});
	return Files;
});
