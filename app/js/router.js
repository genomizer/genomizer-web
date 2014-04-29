define([],function() {
	var Router = Backbone.Router.extend({

		routes: {
			"search/:query": "search",
			"search": "search",
			"upload":"upload",
			"process":"process",
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
		},

		process: function() {
			require([
				'views/ModalAC'
			],function(ModalAC) {
				var modalAC = new ModalAC();
				modalAC.show();
			});
		}

	});
	return Router;
});
