define([
	'collections/SearchResults',
	'views/search/SearchResultsView',
	'text!views/search/searchInputGroup.html'
],function(SearchResults, SearchResultsView, inputGroupTemplate) {

	var Search = Backbone.View.extend({

		TEMPLATE: _.template(inputGroupTemplate),
		initialize: function(options) {
			this.collection = new SearchResults([
					{id: 1, filename: 5},
					{id: 2, filename: 5},
					{id: 3, filename: 5},
					{id: 4, filename: 5},
				],{query:options.query});

			this.resultsView = new SearchResultsView({collection: this.collection});

			this.render();
		},
		el: $("#search"),
		render: function() {
			this.$el.html(this.TEMPLATE());

			this.$el.append(this.resultsView.$el);
		},
		events: {
			"click #search_button": "doSearch",
			"keyup #search_input": "showButton"
		},
		showButton: function() {
			if($('#search_input').val().length != 0) {
				$('#search_button').prop('disabled', false);
				console.log("showbutton");
			} else {
				$('#search_button').prop('disabled', true);
			}

		},
		doSearch: function() {
			alert("Searching for "+$('#search_input').val() +'.');
		}
		
	});
	return Search;
});
