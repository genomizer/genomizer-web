define(['models/Experiment'],function(Experiment) {
	var Experiments = Backbone.Collection.extend({
		url: '/api/experiments',
		model: Experiment,
		initialize:function () {
		}

	});
	return Experiments;
});
