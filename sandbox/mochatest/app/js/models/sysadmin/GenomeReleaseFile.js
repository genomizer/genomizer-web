/**
 * A model class for representing a genome release file.
 */
define([], function() {
	var GenomeReleaseFile = Backbone.Model.extend({
		defaults : {
			"fileName" : "Not defined",
			"species" : "Not defined",
			"genomeVersion" : "Not defined",
			"folderPath" : "Not defined",
			"files" : "Not defined"
		},
		initialize : function() {
			this.progress = 0;
			this.uploadDone = false;
		},

		/**
		 * Sets the file object of this model
		 * @param {Object} fileObj - the file object
		 */
		setFileObj : function(fileObj) {
			this.fileObj = fileObj;
		},

		/**
		 * Sets the url of this model
		 * @param {Object} url - the url
		 */
		setUploadURL : function(url) {
			this.uploadURL = url;
		},

		/**
		 * @return {Object} the file object of this model
		 */
		getFileObj : function() {
			return this.fileObj;
		},

		/**
		 * Uploads this models file object to the server and
		 * binds progress events to the transfer.
		 */
		uploadGenomeReleaseFile : function() {
			var payload = new FormData();
			var that = this;
			payload.append('uploadfile', this.getFileObj());
			$.ajax({
				url : this.uploadURL,
				type : "POST",
				data : payload,
				Authorization : app.auth.get("token"),
				processData : false,
				contentType : false,

				xhr : function() {
					//Upload progress
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.addEventListener("progress", _.bind(that.setUploadProgress, that), false);
					return xhr;
				}
			}).done(_.bind(this.setUploadDone, this));
		},

		/**
		 * Sets the progress of how the uploading is doing for this file
		 * @param {Object} evt
		 */
		setUploadProgress : function(evt) {
			if (evt.lengthComputable) {
				this.progress = evt.loaded / evt.total;
				this.trigger("uploadProgress", this.progress);
			}
		},

		/**
		 * Sets the upload of this file object to done
		 */
		setUploadDone : function() {
			this.uploadDone = true;
			this.progress = 1;
			this.trigger("uploadProgress");
		},

		/**
		 * @return {Object} the size of this models file object
		 */
		getFileSize : function() {
			if (this.fileObj === undefined) {
				return undefined;
			}
			return this.fileObj.size;
		},

		/**
		 * return {Object} boolean value
		 */
		isFileUpload : function() {
			return !!this.fileObj;
		}
	});
	return GenomeReleaseFile;
});

