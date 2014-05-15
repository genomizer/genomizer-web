define([
	'collections/SearchResults',
	'views/search/SearchResultsView',
	'collections/AnnotationTypes',
	'views/search/QueryBuilder',
	'text!templates/search/searchInputGroup.html'
],function(SearchResults, SearchResultsView, AnnotationTypes, QueryBuilder, inputGroupTemplate) {

	var Search = Backbone.View.extend({

		TEMPLATE: _.template(inputGroupTemplate),
		initialize: function(options) {

			this.builder = new QueryBuilder();
			this.builder.on("build", this.appendQueryInput, this);

			this.collection = new SearchResults([], {query:options.query});

			this.resultsView = new SearchResultsView({
				collection: this.collection,
				annotations: app.annotationTypes.withoutExpID()
			});

			this.collection.on("highlightChange", this.showDownloadAndProcessButtons, this);
			this.render();
		},
		el: $("#search"),
		render: function() {
			this.$el.html(this.TEMPLATE());

			this.$el.find('#builder_container').append(this.builder.$el);

			this.$el.find('#search_input').val(this.collection.query);
			this.$el.find('#results_container #table_container').append(this.resultsView.$el);

			if(this.collection.query != undefined) {
				this.searchQueryChanged();
			}
		},
		events: {
			"submit #search_form": "doSearch",
			"input #search_input": "searchQueryChanged",
			"click #download_button": "downloadSelected",
			"click #process_button": "processSelected",
			"click #builder_button": "openBuilder"
		},
		showDownloadAndProcessButtons: function(fileArray) {
			//handles whether or not the download button should be clickable.
			if(fileArray.length != 0) {
				$('#download_button').prop('disabled', false);
			} else {
				$('#download_button').prop('disabled', true);
			}

			//handles whether or not the process button should be clickable.
			if(fileArray.length == 1 && fileArray[0].get("type").toLowerCase() == "raw") {
				$('#process_button').prop('disabled', false);
			} else {
				$('#process_button').prop('disabled', true);
			}
		},
		searchQueryChanged: function() {
			var isEmpty = $('#search_input').val().length != 0;

			// enable the search button if there is a query
			$('#search_button').prop('disabled', !isEmpty);

			// the querybuilder displays differently if the input is empty
			this.builder.setAppending(!isEmpty);
		},
		doSearch: function(e) {
			//navigates to the given searchquery and searches for the given query.
			app.router.navigate('search/' + $('#search_input').val(), {trigger:true});
			this.collection.setSearchQuery($('#search_input').val());
			e.preventDefault();
		},
		downloadSelected: function() {
			//Downloads all the selected files.
			var URLsToDownload = this.collection.getSelectedFileURLs();
			for (var i = 0; i < URLsToDownload.length; i++) {
				this.downloadURL(URLsToDownload[i]);
			};

		},
		downloadURL: function(url) {
			var hiddenIFrameID = 'hiddenDownloader',
				iframe = document.getElementById(hiddenIFrameID);
				if (iframe === null) {
					iframe = document.createElement('iframe');
					iframe.id = hiddenIFrameID;
					iframe.style.display = 'none';
					document.body.appendChild(iframe);
				}
			iframe.src = url;
		},
		processSelected: function() {
			var files = this.collection.getSelectedFiles();
<<<<<<< HEAD
			app.router.navigate("process/" + files[0].get("filename") + "," + files[0].get("id") + "," + files[0].get("expId"), {trigger:true});
		},
		openBuilder: function() {
			console.log("Search > openBuilder")
			this.builder.show();
		},
		appendQueryInput: function(query) {
			var input = $('#search_input');
			var string = input.val();
			if(string.length != 0) {
				string += " ";
			}

			string += query;

			input.val(string);
			input.trigger("input");
 		}
=======
			app.router.navigate("process/" + files[0].get("expId") + "," + files[0].get("filename") + "," + files[0].get("id"), {trigger:true});
		}
>>>>>>> c8450621b21b774135a297b74838fe3928b388f3
		
	});
	return Search;
});
