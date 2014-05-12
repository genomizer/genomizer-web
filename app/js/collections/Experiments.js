define(['models/Experiment'],function(Experiment) {
	var Experiments = Backbone.Collection.extend({
		url: app.BASE_URL + 'experiment',
		model: Experiment,
		initialize:function () {
		}
	});
	return Experiments;
});
