define(['models/sysadmin/GenomeReleaseFile', 'models/sysadmin/Gateway'], function(GenomeReleaseFile, Gateway) {
	var GenomeReleaseFiles = Backbone.Collection.extend({
		model : GenomeReleaseFile,
		url : "http://genomizer.apiary-mock.com/" + "genomeRelease",
		
//"http://genomizer.apiary-mock.com/"


	});
	return GenomeReleaseFiles;
});



