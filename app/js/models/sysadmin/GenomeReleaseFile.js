define(['models/sysadmin/Gateway'], function(Gateway) {
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
		
		getFileObj : function(){
			return this.fileObj;
		}
		
	});
	return GenomeReleaseFile;
});

