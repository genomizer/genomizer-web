define(['models/Experiment'],function(Experiment) {
	
	describe("models/Experiment", function () {
		var experiment;
		beforeEach(function() {
			experiment = new Experiment({
			    "annotations": 
					[
						{
						"id": 1, 
						"name": "pubmedId",
						"value": "abc123"
						}, 
						{
						"id": 2,
						"name": "type",
						"value": "raw"
						},
						{
						"id": 3,
						"name": "specie",
						"value": "human"
						},
						{
						"id": 4,
						"name": "genome release",
						"value": "v.123"
						},
						{
						"id": 5,
						"name": "cell line",
						"value": "yes"
						},
						{
						"id": 6,
						"name": "development stage",
						"value": "larva"
						},
						{
						"id": 7,
						"name": "sex",
						"value": "male"
						},
						{
						"id": 8,
						"name": "tissue",
						"value": "eye"
						}
					],
					 "files": [
						{
						"id": "file-id1", 
						"type": "raw",
						"name": "file1.wig",
						"uploadedBy": "user",
						"date": "2014-04-22",
						"size": "1.3gb",
						"URL": "URLtofile"
						},
						{
						"id": "file-id2", 
						"type": "profile",
						"name": "file2.as",
						"uploadedBy": "user",
						"date": "2014-04-22",
						"size": "1.3gb",
						"URL": "URLtofile"
						}, 
						{
						"id": "file-id3", 
						"type": "region",
						"name": "file3.df",
						"uploadedBy": "user",
						"date": "2014-04-22",
						"size": "1.3gb",
						"URL": "URLtofile"
						}
					],
			});
		});
		describe("should get correct annotation using getAnnotation with specific id",function() {
			it("checking value of annotation[1]", function() {
				var firstAnnotation = experiment.getAnnotation("pubmedId");
				expect(firstAnnotation.value).to.equal("abc123");
				
			});
			it("checking name of annotation[8]", function() {
				var firstAnnotation = experiment.getAnnotation("tissue");
				expect(firstAnnotation.name).to.equal("tissue");
			});

		});
		describe("An experiment contains files", function() {
			it("should have an empty files collection if there are no files", function() {
				var emptyExperiment = new Experiment();
				expect(emptyExperiment.getFiles().length).to.equal(0);
			});
			it("should have 3 files when created with testdata", function() {
				expect(experiment.getFiles().length).to.equal(3);
			});
			it("should contain a file created from testdata", function() {
				expect(experiment.getFiles().get("file-id2")).to.not.equal(undefined);
			});
		})
	});
});
