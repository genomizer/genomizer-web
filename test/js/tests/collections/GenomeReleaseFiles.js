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

		describe("getForSpecies", function (){
			var grf;
			beforeEach(function() {
				grf = new GenomeReleaseFiles(
				[
					{
						"genomeVersion": "fb5",
						"species": "Fly",
						"folderPath": "/var/www/data/genome_releases/Fly/fb5/",
						"files": {}
					},
					{
						"genomeVersion": "pics!",
						"species": "Fly",
						"folderPath": "/var/www/data/genome_releases/Fly/pics!/",
						"files": {
							"SysadminEditView.jpg": "In Progress",
							"SysadminCreateAnnotation.jpg": "In Progress",
							"SysadminAnnotationView.jpg": "In Progress"
						}
					},
					{
						"genomeVersion": "gf",
						"species": "Ape",
						"folderPath": "/var/www/data/genome_releases/Fly/gf/",
						"files": {
							"company_generic.sql": "In Progress"
						}
					}
				]
				);
			});
			it("shoud filter out species", function() {
				expect(grf.getForSpecies("Fly").length).equals(2);
			});
			it("shoud filter out species and be a backbone model/collection pair", function() {
				grf.getForSpecies("Fly").each(function(g) {
					expect(g.get("species")).equal("Fly");
				});

			});
			it("shoud filter out species case insensetive", function() {
				expect(grf.getForSpecies("ape").length).equals(1);
			});
			it("shoud filter out species", function() {
				expect(grf.getForSpecies("--Ape").length).equals(0);
			});
		});
	});
});

