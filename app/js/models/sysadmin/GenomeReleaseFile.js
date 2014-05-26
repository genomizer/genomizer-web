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

		setFileObj : function(fileObj) {
			this.fileObj = fileObj;
		},

		setUploadURL : function(url) {
			this.uploadURL = url;
		},

		getFileObj : function() {
			return this.fileObj;
		},

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

		setUploadProgress : function(evt) {
			if (evt.lengthComputable) {
				this.progress = evt.loaded / evt.total;
				this.trigger("uploadProgress", this.progress);
			}
		},
		setUploadDone : function() {
			this.uploadDone = true;
			this.progress = 1;
			this.trigger("uploadProgress");
		},
		
		getFileSize: function() {
			if(this.fileObj === undefined) {
				return undefined;
			}
			return this.fileObj.size;
		},
		
		isFileUpload: function() {
			return !!this.fileObj;
		}
	});
	return GenomeReleaseFile;
});

