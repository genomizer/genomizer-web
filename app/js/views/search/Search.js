define(['collections/SearchResults'],function(SearchResults) {
	var Search = Backbone.View.extend({
		initialize: function(query) {
			this.model = new SearchResults({query:query});
			this.render();
		},
		render: function() {
			this.$el.html("Search!");
		}
		
	});
	return Search;
});
