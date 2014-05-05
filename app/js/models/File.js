define([],function() {
	var File = Backbone.Model.extend({
		/*
		defaults : {
			experimentID: "id",
			fileName: "name",
			fileId: "id",
			size: "1.3gb",
			type: "raw",
			uploadedBy: "user",
			date: "2014-04-25",
			URL: "URLtofile?"
		},
	   */
		initialize: function() {
			this.trigger
			this.progress = 0;
		},
		uploadFile: function() {
			var formData = new FormData();
			var that = this;
			formData.append('uploadfile',this.fileObj);
			formData.append('path','/var/www/html/data/humanarm.fastq');
			$.ajax({
				url: "http://scratchy.cs.umu.se:8090/html/upload.php",
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
		}
	});
	return File;
});
