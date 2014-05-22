define(['models/Experiment','collections/Experiments'],function(Experiment,Experiments) {
	describe("hasUploadable", function () {
		it("should initialize", function() {
			new Experiments();
		});
		it("should return true if it has one file upload", function() {
			var upEx = new (Experiment.extend({
				isUploadable: function() {
					return true;
				}
			}));

			var experiments = new Experiments();
			experiments.add(upEx);
			expect(experiments.hasUploadable()).to.be.true;
		});
		it("should return false if it has no file upload", function() {
			var upEx = new (Experiment.extend({
				isUploadable: function() {
					return false;
				}
			}));

			var experiments = new Experiments();
			experiments.add(upEx);
			expect(experiments.hasUploadable()).to.be.false;
		});
	});
});
