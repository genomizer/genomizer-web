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
		
		uploadFile: function(url) {
			var payload = new FormData();
			payload.append('uploadfile',this.fileObj);
			Gateway.uploadGenomeReleaseFile(url.URLupload,payload);
		},
	});
	return GenomeReleaseFile;
});

