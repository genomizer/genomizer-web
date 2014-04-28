define(['collections/SearchResults'],function(SearchResults) {
	var Search = Backbone.View.extend({
		initialize: function(options) {
			this.model = new SearchResults([],{query:options.query});
			this.render();
		},
		render: function() {
			this.$el.html("Search!");
		}
		
	});
	return Search;
});
