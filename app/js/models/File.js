define([],function() {
	var File = Backbone.Model.extend({
		initialize: function() {
			this.progress = 0;
			this.uploadDone = false;
		},
		defaults: {
			"type":"raw",
			// TODO: remove hardcoded default values (below)
			 "metaData": "metameta",
			 "author": "name",
			 "uploader": "user1",
			 "grVersion": "hg18",

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
				xhr: function()
				{
					//Upload progress
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
					return xhr;
				} 
*/
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
		}
	});
	return File;
});
