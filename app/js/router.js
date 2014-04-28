define([],function() {
	var Router = Backbone.Router.extend({

		routes: {
			"search/:query": "search",
			"search": "search",
			"upload":"upload",
		},

		search: function(query) {
			require([
				'views/search/Search'
			],function(Search) {
				new Search({el:$("#mainView"),query:query});
			});
		},

		upload: function() {
			require([
				'views/upload/Upload'
			],function(Upload) {
				new Upload({el:$("#mainView")});
			});
		}

	});
	return Router;
});
