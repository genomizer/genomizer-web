define([
	'collections/SearchResults',
	'text!views/search/searchInputGroup.html'
],function(SearchResults, inputGroupTemplate) {

	var Search = Backbone.View.extend({

		TEMPLATE: _.template(inputGroupTemplate),
		initialize: function(options) {
			this.model = new SearchResults([],{query:options.query});
			this.render();
		},
		el: $("#search"),
		render: function() {
			this.$el.html(this.TEMPLATE());	
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
