define([
	'collections/SearchResults'
],function(SearchResultsCollection) {

	var SearchResultsView = Backbone.View.extend({

		TEMPLATE: _.template('<div style="background-color:yellow" id="search_results_coll"><p>hej</p></div>'),
		initialize: function(options) {
			this.model = new SearchResultsCollection([],{query:options.query});
		},
		//el: $("#search_results_coll"),
		render: function() {
			this.$el.html(this.TEMPLATE());	
		}

	});
	return SearchResultsView;
});

