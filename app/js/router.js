define([],function() {
	var Router = Backbone.Router.extend({

		routes: {
			"search/:query": "search",
			"search": "search",
			"": "search",
			"upload":"upload",
			"process":"process",
		},

		initialize: function(options) {
			this.history = [];
			this.on("route", this.storeRoute);
		},

		storeRoute: function(event, p2) {
			console.log("Router > storeRoute > event: ", event, p2);
			this.history.push(Backbone.history.fragment);
		},

		previous: function(options) {
			console.log("router > previous > history: ", this.history);
			if (this.history.length > 2) {

				// remove the current page from history
				this.history.pop();

				// get the previous page
				var previous = this.history.pop();

				console.log("router > previous > previouspath: ", previous);
				this.navigate(previous, options);
			}
		},
		hasPrevious: function() {
			return this.history.length > 2;
		},

		search: function(query) {
			var that = this;
			require([
				'views/search/Search'
			],function(Search) {
				new Search({el:that.getNewMainView(),query:query});
			});
		},

		upload: function() {
			var that = this;
			require([
				'views/upload/Upload'
			],function(Upload) {
				new Upload({el:that.getNewMainView()});
			});
		},

		process: function() {
			require([
				'views/processModal/Process'
			],function(Process) {
				var modal = new Process();
				modal.show();
			});
		},
		getNewMainView: function() {
			$("#mainView").replaceWith('<section id=mainView></section>');
			return $("#mainView");
		}

	});
	return Router;
});
