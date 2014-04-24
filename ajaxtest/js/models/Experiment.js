define([],function() {
	var Experiment = Backbone.Model.extend({
		defaults : {
			name: "Experiment1",
			species: "Cat",
			sex: "Male",
			files: {
				raw: [],
				region: [],
				profile: []
			}
		}
	});
	return Experiment;
});
