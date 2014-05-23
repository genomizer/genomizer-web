define([
	'collections/SearchResults',
	'views/search/SearchResultsView',
	'collections/AnnotationTypes',
	'views/search/QueryBuilder',
	'text!templates/search/searchInputGroup.html',
	'text!templates/search/filesToDeleteTemplate.html',
	'text!templates/search/experimentsToDeleteTemplate.html'
],function(SearchResults, SearchResultsView, AnnotationTypes, 
	QueryBuilder, inputGroupTemplate, filesToDeleteTemplate, experimentsToDeleteTemplate) {

	var Search = Backbone.View.extend({

		TEMPLATE: _.template(inputGroupTemplate),
		TEMPLATEDELETEFILE: _.template(filesToDeleteTemplate),
		TEMPLADEDELETEEXP: _.template(experimentsToDeleteTemplate),
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
			"click #builder_button": "openBuilder",
			"click #delete_button": "openDeleteModal",
			"click #do_delete": "deleteData" 
		},
		openDeleteModal: function() {

			var files = this.collection.getSelectedFiles();
			var fileNames = [];
			var expIDs = [];
			for(var i = 0; i<files.length;i++) {
				console.log("file to delete: ", files[i].get("id"));
				console.log(files[i]);
				fileNames.push(files[i].get("filename"));
				expIDs.push(files[i].get("expId"));
			}

			//kolla experiment och lägg till de

			$('#delete-body-text').html(this.TEMPLATEDELETEFILE({
				'fileID': fileNames[0],
				'expID': expIDs[0]
			}));

			for(var i = 1; i<fileNames.length;i++) {
				this.$el.find('#delete-body-text').append(this.TEMPLATEDELETE({
					'fileID': fileNames[i],
					'expID': expIDs[i]
				}));
			}
		},
		deleteData: function() {
			var files = this.collection.getSelectedFiles();
			for(var i = 0; i<files.length;i++) {
				console.log("file to delete: ", files[i].get("id"));
				files[i].destroy();
			}
		},
		showDownloadAndProcessButtons: function(fileArray) {
			console.log()
			//handles whether or not the download or process buttons should be clickable.
			if(fileArray.length > 0) {
				$('#delete_button').prop('disabled', false);
				$('#download_button').prop('disabled', false);
				$('#process_button').prop('disabled', false);
				var startSpecies = this.collection.getSpeciesForExperiment(fileArray[0].get("expId"));
				for(var i = 0;i<fileArray.length;i++) {
					if(fileArray[i].get("type").toLowerCase() != "raw" || !(this.collection.getSpeciesForExperiment(fileArray[i].get("expId"))==startSpecies)) {
						$('#process_button').prop('disabled', true);
						break;
					}
				}
			} else {
				$('#delete_button').prop('disabled', true);
				$('#download_button').prop('disabled', true);
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
			var that = this;
			var URLsToDownload = this.collection.getSelectedFileURLs();
			// this is horrible but as we see it the only way to download multiple files
			for (var i = 0; i < URLsToDownload.length; i++) {
				console.log(URLsToDownload[i]);
					that.downloadURL(URLsToDownload[i]);
			};
		},
		downloadURL: function(url) {
			
			var iframe = $(document.createElement('iframe'));
			//iframe.id = hiddenIFrameID;
			iframe.css('display', 'none');
			$(document.body).append(iframe);
			console.log('downloading url: ',url);
			iframe.attr('src', url);
			iframe.ready(function() {
				setTimeout(function() {
					iframe.remove();
				}, 10000); // arbitrary amount of milliseconds :DDDD
			})
		},
		processSelected: function() {
			var files = this.collection.getSelectedFiles();
			var specie = this.collection.getSpeciesForExperiment(files[0].get("expId"));
			var processFiles = "";
			for(var i = 0; i<files.length;i++) {
				if(processFiles != "") {
					processFiles += ",";
				}
				processFiles += files[i].get("expId");
			}
			app.router.navigate("process/"+specie+","+processFiles, {trigger:true});
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
	});
	return Search;
});
