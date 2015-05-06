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

			if(this.files === undefined || this.get("files").length > 0) {
				this.files = new Files(this.get("files"),{experiment:this});
				this.files.on("add remove changeIsUploading",this.changeUploadable, this);
				this.files.on("fileSelect", this.fileSelect, this);
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
			return this.files.hasUpload() && !this.isUploading;
		},
		getPossibleGenomeReleases: function() {
			var species = this.getAnnotation("Species").value;
			return app.genomeReleaseFiles.getForSpecies(species);
		},
		changeUploadable: function() {
			this.trigger("changeUploadable");
		},
		fileSelect: function(file, checked) {
			this.trigger("fileSelect", file, checked);
		}
	});
	return Experiment;
});
