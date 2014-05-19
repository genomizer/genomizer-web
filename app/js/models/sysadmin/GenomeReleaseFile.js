define([], function() {
	var GenomeReleaseFile = Backbone.Model.extend({
		defaults : {
			"genomeVersion" : "Not defined",
			"specie" : "Not defined",
			"path" : "Not defined",
			"fileName" : "Not defined"

		},
		initialize : function() {
		},
		
		setFileObj : function(fileObj){
			this.fileObj = fileObj;
		},
		
		setUploadURL : function(url){
			this.uploadURL = url;
		},
		
		uploadFile: function() {
			// var formData = new FormData();
			// var that = this;
			// formData.append('uploadfile',this.fileObj);
			// $.ajax({
				// url: this.get("URLupload"),
				// type: "POST",
				// data: formData,
				// username: "pvt",
				// password: "pvt",
				// processData: false,
				// contentType: false,
		// /*		beforeSend: function(jqXHR) {
					// debugger;
					// jqXHR.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
				// }
				// xhr: function()
				// {
					// //Upload progress
					// var xhr = $.ajaxSettings.xhr();
					// xhr.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
					// return xhr;
				// } 
// */
			// }).done(_.bind(this.setUploadDone,this));
		},
	});
	return GenomeReleaseFile;
});

