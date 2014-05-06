define(['collections/Files','models/Experiment','models/File',],function(Files,Experiment,File) {
	describe("Testing collections/Files", function () {
			describe("should initialize correctly",function() {
				it("no options supplied", function () {
					var files = new Files();
				});
				it("save experiment as attribute,if supplied in constructor", function () {
					var experiment = new Experiment();
					var files = new Files([],{experiment:experiment});
					expect(files.experiment).to.equal(experiment);
				});
			});
			describe("updateExperimentId",function() {
				it("set experiment id", function () {
					var experiment = new Experiment({id:3});
					expect(experiment.id).to.equal(3);
				});
				it("should update experiment id", function () {
					var experiment = new Experiment({id:3});
					var files = new Files([],{experiment:experiment});
					files.add(new File());
					expect(files.at(0).get("experimentID")).to.not.equal(3);
					files.updateExperimentIds();
					expect(files.at(0).get("experimentID")).to.equal(3);
				});
				it("should update multiple files with experiment id", function () {
					var experiment = new Experiment({id:3});
					var files = new Files([],{experiment:experiment});
					files.add(new File());
					files.add(new File());
					expect(files.at(0).get("experimentID")).to.not.equal(3);
					expect(files.at(1).get("experimentID")).to.not.equal(3);
					files.updateExperimentIds();
					expect(files.at(0).get("experimentID")).to.equal(3);
					expect(files.at(1).get("experimentID")).to.equal(3);
				});
			});
	});
});
