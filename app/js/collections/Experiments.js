define(['models/Experiment'],function(Experiment) {
	var Experiments = Backbone.Collection.extend({
		url: 'http://scratchy.cs.umu.se:8000/api/experiment',
		model: Experiment,
		initialize:function () {
		}
	});
	return Experiments;
});
