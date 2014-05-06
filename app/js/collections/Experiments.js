define(['models/Experiment'],function(Experiment) {
	var Experiments = Backbone.Collection.extend({
		url: 'http://genomizer.apiary.io/experiment',
		model: Experiment,
		initialize:function () {
		}

	});
	return Experiments;
});
