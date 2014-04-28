define([],function() {
	var Router = Backbone.Router.extend({

		routes: {
			"search/:query": "search",
			"upload":"upload",
		},

		search: function(query) {
			require([
					'collections/SearchResults'
			],function(SearchResults) {
				console.log("search");
			});
		},

		upload: function() {
			console.log("ul");
		}

	});
	return Router;
});
