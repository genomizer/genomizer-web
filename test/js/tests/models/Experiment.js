define(['models/Experiment'],function(Experiment) {

	describe("Testing Experiment model", function () {
			it("should have default name'", function () {
				var experiment = new Experiment();
				expect(experiment.get("name")).to.equal("Experiment1");
			});
			it("should have hatt 3 '", function () {
				var experiment = new Experiment();
				expect(experiment.hatt).to.equal(3);
			});
			it("should have female '", function () {
				var experiment = new Experiment();
				expect(experiment.get("sex")).to.equal("Female");
			});
			it("should have species: cat '", function () {
				var experiment = new Experiment();
				expect(experiment.get("species")).to.equal("Cat");
			});

	});
});
