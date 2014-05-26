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
			this.collection.on("highlightChange", this.showButtons, this);
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
			"click #do_delete": "deleteData",
			"click #upload_button": "uploadToExperiment" 
		},
		uploadToExperiment: function() {

			var experiments = this.collection.getSelectedExperiments();

			console.log(experiments);
			var data = experiments.at(0).get("name");

			for(var i = 1; i < experiments.length; i++) {
				data = data + '☯' + experiments.at(i).get("name");
			}
			console.log("Experiments:", data);

			app.router.navigate("upload/"+data, {trigger:true});

		},
		openDeleteModal: function() {

			var files = this.collection.getSelectedFiles();
			var fileNames = [];
			var expIDs = [];
			for(var i = 0; i<files.length;i++) {
				console.log("file to delete: ", files.at(i).get("id"));
				fileNames.push(files.at(i).get("filename"));
				expIDs.push(files.at(i).get("expId"));
			}

			//kolla experiment och lägg till de

			$('#delete-files-body-text').html(this.TEMPLATEDELETEFILE({
				'fileID': fileNames[0],
				'expID': expIDs[0]
			}));

			for(var i = 1; i<fileNames.length;i++) {
				this.$el.find('#delete-files-body-text').append(this.TEMPLATEDELETEFILE({
					'fileID': fileNames[i],
					'expID': expIDs[i]
				}));
			}
		},
		deleteData: function() {
			var files = this.collection.getSelectedFiles();
			for(var i = 0; i<files.length;i++) {
				console.log("file to delete: ", files.at(i).get("id"));
				files.at(i).destroy();
			}
		},
		showButtons: function(fileArray) {

			var selectedFiles = this.collection.getSelectedFiles();
			var selectedExperiments = this.collection.getSelectedExperiments();
			//handles whether or not the upload or process buttons should be clickable.
			if(selectedExperiments.length > 0) {
				$('#upload_button').prop('disabled', false);
				$('#process_button').prop('disabled', false);

				//Makes sure there is two raw files in selected experiments and all have same species.
				var startSpecie = this.collection.getSpeciesForExperiment(selectedExperiments.at(0).get("name")).toLowerCase();
				for(var i = 0; i < selectedExperiments.length; i++) {
					if(startSpecie != this.collection.getSpeciesForExperiment(selectedExperiments.at(i).get("name")).toLowerCase()) {
						$('#process_button').prop('disabled', true);
						break;
					}
					var expFiles = selectedExperiments.at(i).get("files");
					if(expFiles.length == 0) {
						$('#process_button').prop('disabled', true);
						break;
					} else {
						var nrOfRawFiles = 0;
						for(var j = 0; j < expFiles.length;j++) {
							if(expFiles[j].type.toLowerCase() == "raw") {
								nrOfRawFiles++;
							}
						}
						if(nrOfRawFiles!=2) {
							$('#process_button').prop('disabled', true);
							break;
						}
					}
				}
			} else {
				$('#upload_button').prop('disabled', true);
			}

			//handles whether or not the download or delete buttons should be clickable.
			if(selectedFiles.length > 0 || selectedExperiments.length > 0) {
				$('#delete_button').prop('disabled', false);

				$('#download_button').prop('disabled', false);
				for(var i = 0; i < selectedExperiments.length; i++) {
					if(selectedExperiments.at(i).get("files").length == 0) {
						$('#download_button').prop('disabled', true);
						break;
					}
				}
			} else {
				$('#delete_button').prop('disabled', true);
				$('#download_button').prop('disabled', true);
			}

			/* TODO: GET SELECTED EXPERIMENTS!! */
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
			var specie = this.collection.getSpeciesForExperiment(files.at(0).get("expId"));
			var processFiles = "";
			for(var i = 0; i<files.length;i++) {
				if(processFiles != "") {
					processFiles += ",";
				}
				processFiles += files.at(i).get("expId");
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
