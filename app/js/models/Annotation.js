define([],function() {
	var Annotations = Backbone.Model.extend({
		defaults : {
			pubmedId: "freetext",
			type: [ 
				"type1",
				"type2",
				"type3"
			],
			specie: [
				"fly",
				"human",
				"rat"
			],
			genoRelease: "freetext",
			cellLine: "freetext",
			devStage: "freetext",
			sex: "freetext",
			tissue: "freetext"
		},
		initialize: function() {
			this.hatt = 3;
			this.set({sex:"Female"});
		}
	});
	return Annotations;
});
