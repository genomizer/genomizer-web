define([],function() {
	var File = Backbone.Model.extend({
		url: app.BASE_URL + 'file',
		initialize: function() {
			this.progress = 0;
			this.uploadDone = false;
		},
		defaults: {
			"type":"raw", // This one is used and should be kept
			"genomeVersion": "hg18",
			/*
			 "metaData": "metameta",
			 "author": "name",
			 grVersion": "hg18",
			*/
			 "uploader": "defaultWebUser" // TODO: remove hardcoded default value uploader

		},
		// Requires: URLupload in attributes
		uploadFile: function() {
			var formData = new FormData();
			var that = this;
			formData.append('uploadfile',this.fileObj);
			$.ajax({
				url: this.get("URLupload"),
				type: "POST",
				data: formData,
				username: "pvt",
				password: "pvt",
				processData: false,
				contentType: false,
		/*		beforeSend: function(jqXHR) {
					debugger;
					jqXHR.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
				}
*/
				xhr: function()
				{
					//Upload progress
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
					return xhr;
				} 
			}).done(_.bind(this.setUploadDone,this));
		},
		setUploadProgress:function(evt) {
			if (evt.lengthComputable) {
				this.progress = evt.loaded / evt.total;
				this.trigger("uploadProgress",this.progress);
			}
		},
		setUploadDone: function() {
			this.uploadDone = true;
			this.progress = 1;
			this.trigger("uploadProgress");
		},
		fetchAndUpload: function() {
			var that = this;
			this.save().success(function() {
				// Url should now be available
				that.uploadFile();
			});
		},
		getReadableFileSize: function() {
			var size = this.getFileSize();
			if(size === undefined) {
				return undefined;
			}
			
			if (size < 1024) {
				return  (size.toFixed(2).toString() + " B");
			} else if (size < 1048576) {
				return ((size / 1024).toFixed(2).toString() + " KiB");
			} else if (size < 1073741824) {
				return ((size / 1048576).toFixed(2).toString() + " MiB");
			} else if (size < 1099511627776) {
				return ((size / 1073741824).toFixed(2).toString() + " GiB");
			} else {
				return ((size / 1099511627776).toFixed(2).toString() + " TiB");
			}
		},
		getFileSize: function() {
			if(this.fileObj === undefined) {
				return undefined;
			}
			return this.fileObj.size;
		},
		isFileUpload: function() {
			return !!this.fileObj 
		}
	});
	return File;
});
