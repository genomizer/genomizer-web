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
			                 ]
			});
		});
		describe("should get correct annotation using getAnnotation with specific id",function() {
			it("checking value of annotation[1]", function() {
				var firstAnnotation = experiment.getAnnotation(1);
				expect(firstAnnotation.value).to.equal("abc123");
				
			});
			it("checking name of annotation[8]", function() {
				var firstAnnotation = experiment.getAnnotation(8);
				expect(firstAnnotation.name).to.equal("tissue");
			});

		});

	});
});
