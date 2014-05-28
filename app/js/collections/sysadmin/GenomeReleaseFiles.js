/**
 * A Backbone Collection of the model genomeReleaseFile. This class is used
 * for displaying genome releases and also to upload genome releases and files
 * to the server.
 */
define(['models/sysadmin/GenomeReleaseFile', 'models/sysadmin/Gateway'], function(GenomeReleaseFile, Gateway) {
	var GenomeReleaseFiles = Backbone.Collection.extend({
		model : GenomeReleaseFile,
		url : Gateway.getURL() + "genomeRelease",

		/**
		 * Adds fileObjects to the GenomeReleaseFiles in this collection
		 * @param {Object} fileObjects - the file objects that should be added
		 */
		addFilesByFileObject : function(fileObjects) {
			var that = this;
			_.each(fileObjects, function(fileObj) {
				var file = new GenomeReleaseFile({
					fileName : fileObj.name
				});
				file.fileObj = fileObj;
				that.add(file);
			});
		},

		/**
		 * Uploads all the files in this collection to the server
		 * @param {Object} data - data contataining an URL
		 */
		uploadGenomeReleaseFiles : function(data) {
			var i = 0;
			_.forEach(this.models, function(file) {
				file.setUploadURL(data[i].URLupload);
				i++;
				file.uploadGenomeReleaseFile();
			});

		},

		/**
		 * @return {Object} returns true if this collection has unfinished
		 * uploads
		 */
		hasUnfinishedUploads : function() {
			var aNotDoneUpload = this.find(function(f) {
				return !f.uploadDone;
			});
			return aNotDoneUpload !== undefined;
		},

		/**
		 * @return {Object} returns the total size of the files to be uploaded
		 */
		getTotalUploadFileSize : function() {
			var size = 0;
			this.each(function(f) {
				if (f.isFileUpload()) {
					size += f.getFileSize();
				}
			});
			return size;

		},

		/**
		 * @return {Object} returns the total upload progress as a value between 0 and 1
		 */
		getTotalUploadProgress : function() {
			if (this.getTotalUploadFileSize() == 0) {
				return 1;
			}
			var uploadedSize = 0;
			this.each(function(f) {
				if (f.isFileUpload()) {
					uploadedSize += f.getFileSize() * f.progress;
				}
			});
			return uploadedSize / this.getTotalUploadFileSize();
		},

		/**
		 * Sets information about the files in this collection.
		 * Used for uploading
		 * @param {Object} specie - the specie these genome release files belong to
		 * @param {Object} genomeVersion - the version of the genome release
		 */
		setFileInfo : function(specie, genomeVersion) {
			this.specie = specie;
			this.genomeVersion = genomeVersion;
		},

		/**
		 * @return {Object} returns the specie of this genome release
		 * file collection
		 */
		getSpecie : function() {
			return this.specie;
		},

		/**
		 * Returns a specific genomeReleaseFile by its name
		 * @param {Object} name - the name of the genomeReleaseFile
		 * @return {Object} the genomeReleaseFile
		 */
		getGenomeReleaseByName : function(name) {
			var genomeReleaseFile = null;
			for (var i = 0; i < this.length; i++) {
				if ((this.at(i).get('fileName')).toLowerCase() == name.toLowerCase()) {
					genomeReleaseFile = this.at(i);
					break;
				}
			}
			return genomeReleaseFile;
		},

		/**
		 * @return {Object} all the file names in this collection
		 */
		getFileNames : function() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				result.push(this.at(i).get('fileName'));
			}
			return result;
		},

		comparator : function(model) {
			if (this._order_by == 'genomeVersion')
				return model.get('genomeVersion');
			else
				return model.get('species');
		},

		/**
		 * Sorts this collection
		 * @param {Object} sortString - the value to sort by
		 */
		orderBy : function(sortString) {
			this._order_by = sortString;
			this.sort();
		},

		_order_by : 'specie',

		/**
		 * Returns all the genome release files for a given species
		 * @param {Object} specie - the specie
		 * @return {Object} a new Collection with the genomeReleaseFiles
		 */
		getForSpecies : function(specie) {
			var gfs = this.filter(function(gr) {
				return gr.get("species").toLowerCase() == specie.toLowerCase();
			});
			return new GenomeReleaseFiles(gfs);
		},

		/**
		 * @return the payload for uploading
		 */
		getPayload : function() {
			var payload = new Backbone.Model();
			payload.set({
				"genomeVersion" : this.genomeVersion,
				"specie" : this.specie,
				"files" : this.getFileNames()
			});
			return payload;
		}
	});
	return GenomeReleaseFiles;
});

