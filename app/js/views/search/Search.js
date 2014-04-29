define([
	'views/search/SearchResults',
	'text!views/search/searchInputGroup.html'
],function(SearchResults, inputGroupTemplate) {

	var Search = Backbone.View.extend({

		TEMPLATE: _.template(inputGroupTemplate + '<section id="search_results_view"></section>'),
		initialize: function(options) {
			this.SearchResults = new SearchResults(options);
			this.render();
		},
		el: $("#search"),
		render: function() {
			this.$el.html(this.TEMPLATE());
			this.SearchResults.$el = this.$el.find("#search_results_view");
			this.SearchResults.render();
		},
		events: {
			"click #search_button": "doSearch",
			"keyup #search_input": "showButton",
			"click #download_button": "downloadSelected",
			"click #process_button": "processSelected"
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
		},
		downloadSelected: function() {
			alert("download");
		},
		processSelected: function() {
			alert("process");
		}
		
	});
	return Search;
});


