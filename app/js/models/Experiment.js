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
		},
		initialize: function() {
			this.hatt = 3;
			this.set({sex:"Female"});
		}
	});
	return Experiment;
});
