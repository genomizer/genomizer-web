define(['collections/sysadmin/GenomeReleaseFiles', 'models/sysadmin/GenomeReleaseFile'], function(GenomeReleaseFiles, GenomeReleaseFile) {
	describe("collections/sysadmin/GenomeReleaseFiles", function() {
		it("Should exist after created", function() {
			var genomeReleaseFiles = new GenomeReleaseFiles();
			genomeReleaseFiles.should.exist;
		});
		describe("Tests of orderBy(specie)", function (){
				it("Should sort genomeReleaseFiles correctly when using orderBy(specie)", function() {
				var GenomeReleaseFile1 = new GenomeReleaseFile({
					"genomeVersion" : "hg1337",
					"specie" : "owl",
					"path" : "/somewhere/on/drive/hg1337/",
					"fileName" : "abc123.fasta"
				});
				var GenomeReleaseFile2 = new GenomeReleaseFile({
					"genomeVersion" : "mg17",
					"specie" : "rat",
					"path" : "/somewhere/on/drive/mg17/",
					"fileName" : "zzz.fasta"
				});
				var GenomeReleaseFile3 = new GenomeReleaseFile({
					"genomeVersion" : "hu66",
					"specie" : "baby rabbit",
					"path" : "/somewhere/on/drive/hu66/",
					"fileName" : "filename.fasta"
				});
				var GenomeReleaseFile4 = new GenomeReleaseFile({
					"genomeVersion" : "aa53",
					"specie" : "human",
					"path" : "/somewhere/on/drive/aa53/",
					"fileName" : "curb.fasta"
				});

				var genomeReleaseFiles = new GenomeReleaseFiles([GenomeReleaseFile1, GenomeReleaseFile2, GenomeReleaseFile3, GenomeReleaseFile4]);
	
				genomeReleaseFiles.orderBy("specie");
				genomeReleaseFiles.models[0].get('genomeVersion').should.equal('hu66');				
			});
		});
		describe("Tests of orderBy(genomeVersion)", function (){
				it("Should sort genomeReleaseFiles correctly when using orderBy(genomeVersion)", function() {
				var GenomeReleaseFile1 = new GenomeReleaseFile({
					"genomeVersion" : "hg1337",
					"specie" : "owl",
					"path" : "/somewhere/on/drive/hg1337/",
					"fileName" : "abc123.fasta"
				});
				var GenomeReleaseFile2 = new GenomeReleaseFile({
					"genomeVersion" : "mg17",
					"specie" : "rat",
					"path" : "/somewhere/on/drive/mg17/",
					"fileName" : "zzz.fasta"
				});
				var GenomeReleaseFile3 = new GenomeReleaseFile({
					"genomeVersion" : "hu66",
					"specie" : "baby rabbit",
					"path" : "/somewhere/on/drive/hu66/",
					"fileName" : "filename.fasta"
				});
				var GenomeReleaseFile4 = new GenomeReleaseFile({
					"genomeVersion" : "aa53",
					"specie" : "human",
					"path" : "/somewhere/on/drive/aa53/",
					"fileName" : "curb.fasta"
				});

				var genomeReleaseFiles = new GenomeReleaseFiles([GenomeReleaseFile1, GenomeReleaseFile2, GenomeReleaseFile3, GenomeReleaseFile4]);
	
				genomeReleaseFiles.orderBy("genomeVersion");
				genomeReleaseFiles.models[0].get('genomeVersion').should.equal('aa53');
			});
		});
		describe("Tests of orderBy(fileName)", function (){
				it("Should sort genomeReleaseFiles correctly when using orderBy(fileName)", function() {
				var GenomeReleaseFile1 = new GenomeReleaseFile({
					"genomeVersion" : "hg1337",
					"specie" : "owl",
					"path" : "/somewhere/on/drive/hg1337/",
					"fileName" : "abc123.fasta"
				});
				var GenomeReleaseFile2 = new GenomeReleaseFile({
					"genomeVersion" : "mg17",
					"specie" : "rat",
					"path" : "/somewhere/on/drive/mg17/",
					"fileName" : "zzz.fasta"
				});
				var GenomeReleaseFile3 = new GenomeReleaseFile({
					"genomeVersion" : "hu66",
					"specie" : "baby rabbit",
					"path" : "/somewhere/on/drive/hu66/",
					"fileName" : "filename.fasta"
				});
				var GenomeReleaseFile4 = new GenomeReleaseFile({
					"genomeVersion" : "aa53",
					"specie" : "human",
					"path" : "/somewhere/on/drive/aa53/",
					"fileName" : "curb.fasta"
				});

				var genomeReleaseFiles = new GenomeReleaseFiles([GenomeReleaseFile1, GenomeReleaseFile2, GenomeReleaseFile3, GenomeReleaseFile4]);
				
				genomeReleaseFiles.orderBy("fileName");
				genomeReleaseFiles.models[0].get('genomeVersion').should.equal('hg1337');
			});
		});
		describe("Tests of getGenomeReleaseByName", function (){
				it("Should retrieve correct genomeReleaseFile when using getByGenomeReleaseName", function() {
				var genomeRelease1 = new GenomeReleaseFile({
					"fileName" : 'A1.fasta'
				});
				var genomeRelease2 = new GenomeReleaseFile({
					"fileName" : 'AA2.fasta'
				});
				var genomeRelease3 = new GenomeReleaseFile({
					"fileName" : 'A3.fasta'
				});
				var genomeRelease4 = new GenomeReleaseFile({
					"fileName" : 'BASE3da.js'
				});
				var genomeReleaseFiles = new GenomeReleaseFiles([genomeRelease1, genomeRelease2, genomeRelease3, genomeRelease4]);
	
				var result = genomeReleaseFiles.getGenomeReleaseByName('A1.fasta');
				result.get('fileName').should.equal('A1.fasta');
				var result = genomeReleaseFiles.getGenomeReleaseByName('AA2.fasta');
				result.get('fileName').should.equal('AA2.fasta');
				var result = genomeReleaseFiles.getGenomeReleaseByName('A3.fasta');
				result.get('fileName').should.equal('A3.fasta');
				var result = genomeReleaseFiles.getGenomeReleaseByName('BASE3da.js');
				result.get('fileName').should.equal('BASE3da.js');
			});
		});
		describe("Tests of getFileNames", function (){
				it("Should retrieve correct Names when using getFileNames", function() {
				var genomeRelease1 = new GenomeReleaseFile({
					"fileName" : 'A1.fasta'
				});
				var genomeRelease2 = new GenomeReleaseFile({
					"fileName" : 'AA2.fasta'
				});
				var genomeRelease3 = new GenomeReleaseFile({
					"fileName" : 'A3.fasta'
				});
				var genomeRelease4 = new GenomeReleaseFile({
					"fileName" : 'BASE3da.js'
				});
				var genomeReleaseFiles = new GenomeReleaseFiles([genomeRelease1, genomeRelease2, genomeRelease3, genomeRelease4]);
	
				var result = genomeReleaseFiles.getFileNames();
				result[0].should.equal('A1.fasta');
				result[1].should.equal('AA2.fasta');
				result[2].should.equal('A3.fasta');
				result[3].should.equal('BASE3da.js');
			});
		});
	});
});

