define([
	'collections/SearchResults'
],function(SearchResultsCollection) {

	var SearchResultsView = Backbone.View.extend({

		//TEMPLATE: _.template(inputGroupTemplate),
		initialize: function(options) {
			this.model = new SearchResultsCollection([],{query:options.query});
			this.render();
		},
		//el: $("#search"),
		render: function() {
			//this.$el.html(this.TEMPLATE());	
		},
		events: {
		}	
	});
	return SearchResultsView;
});
