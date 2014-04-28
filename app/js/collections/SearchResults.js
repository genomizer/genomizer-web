define(['models/Experiment'],function(Experiment) {
	var SearchResults = Backbone.Collection.extend({
		url: function() {
			return '/api/search?q=' + this.query;
		},
		model: Experiment,
		initialize:function (models,options) {
			this.query = options.query;

			console.log("hej",options.query);
		}

	});
	return SearchResults;
});
