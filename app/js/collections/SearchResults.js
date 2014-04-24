define(['models/Experiment'],function(Experiment) {
	var SearchResults = Backbone.Collection.extend({
		url: '/api/search?q=((arpupulus puparprisisla[species]) AND Yuri[author]) AND female[sex]',
		model: Experiment,
		initialize:function () {
		}

	});
	return SearchResults;
});
