define([
	'collections/Files'
],function(Files) {
	var Experiment = Backbone.Model.extend({

		defaults : {
			files : [],
			annotations: []
		},

		initialize: function() {
			
			this.on("sync", this.syncFiles, this);

			// the sync event wont fire if the constructor is fed with data
			this.syncFiles();
		},
		syncFiles: function() {

			// TODO: check if this satement does things right, so it works for both a new experiment (file upload) and existing experiment (search restults).
			if(this.files === undefined || this.get("files").length > 0) {
				this.files = new Files(this.get("files"),{experiment:this});
				console.log("Syncing files");
			}
		},
		getFiles: function() {
			return this.files;
		},
		getAnnotation: function(name) {
			for (var i = 0; i < this.attributes.annotations.length; i++) {
				if(this.attributes.annotations[i].name == name) {
					return this.attributes.annotations[i];
				}
			}
			return {};
		},
		updateExperimentIdsForFiles: function () {
			this.files.updateExperimentIds(this.get("name"));

		},
		isUploadable: function() {
			return this.files.length > 0;
		},
		getPossibleGenomeReleases: function() {
			return app.genomeReleaseFiles;
		}
	});
	return Experiment;
});
