define(['models/sysadmin/GenomeReleaseFile'],function(GenomeReleaseFile) {
	describe("models/sysadmin/GenomeReleaseFile", function () {
			it("Should exist after created", function () {
				var genomeReleaseFile = new GenomeReleaseFile();
				genomeReleaseFile.should.exist;
			});
	});
});



  