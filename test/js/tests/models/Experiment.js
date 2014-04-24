define(['models/Experiment'],function(Experiment) {
	describe("Testing Experiment model", function () {
			it("should have default name'", function () {
				var experiment = new Experiment();
				expect(experiment.get("name")).to.equal("Experiment1");
			});
	});
});
