/*
	NEW:
	This class handles file uploads actions aswell as
	converting filesizes between Bytes, Megabytes,
	Gigabytes and Terabytes.
	
	TODO: Remove hardcoded passwords and usernames.
	TODO: Comment file
	TODO: Remove hardcoded uploader.

*/
define([],function() {
	/*	
		NEW:
		Create a new file model
	*/
	var File = Backbone.Model.extend({
		
		//Initialize the File.
		initialize: function() {
			this.progress = 0;
			this.uploadDone = false;
		},
		
		/*	
			NEW:
			Set the default values.
			TODO: Confirm these settings...
		*/
		defaults: {
			"type":"raw", // This one is used and should be kept
			/*"genomeVersion": "hg18",
			"grVersion": "hg18",*/
			
			"author": "name",
			"metaData": "metameta",			
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
				beforeSend: function(jqXHR) {
					debugger;
					jqXHR.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
				},

				xhr: function()
				{
					//Upload progress
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
					return xhr;
				},
                error: function(){
                    alert("Failed to upload file, remove file from experiment and try again.");
                } 
			}).done(_.bind(this.setUploadDone,this));
		},
		/* 	NEW:
			Sets the upload progress from an event */
		setUploadProgress:function(evt) {
			if (evt.lengthComputable) {
				this.progress = evt.loaded / evt.total;
				this.trigger("uploadProgress",this.progress);
			}
		},
		
		/*	NEW:
			Triggers the upload done trigger */
		setUploadDone: function() {
			this.uploadDone = true;
			this.progress = 1;
			this.trigger("uploadProgress");
		},
		/* NEW: Gets a file and uploads it to the server */
		fetchAndUpload: function() {
			var that = this;
			this.save().success(function() {
				// Url should now be available
				that.uploadFile();
			});
		},

		/*
			NEW:
			Converts file sizes to readable formats, formats supported is
			Bytes, KiloBytes, Megabytes, Gigabytes and Terabytes.
			
			This is for making reading easier on how big the file is 

		*/
		getReadableFileSize: function() {
			var size = this.getFileSize();
			if(size === undefined) {
				return undefined;
			}
			
			//NEW: Conversion between the filesizes	
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
		
		/*
			NEW:
			Returns the filesize of an file
		*/
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
	
	//NEW: Finaly return the file object.
	return File;
});
