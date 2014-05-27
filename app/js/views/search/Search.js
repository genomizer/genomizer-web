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
		TEMPLATEDELETEEXP: _.template(experimentsToDeleteTemplate),
		el: $("#search"),
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

			this.$el.tooltip({
				selector: '.search-toolbar .button-container .btn',
				container: '.search-toolbar .button-container .btn-group',
				delay: {
					show: 500,
					hide: 100
				},
				html: true 
			});
		},
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

			//display experiments to be deleted
			var exp = this.collection.getSelectedExperiments();

			if(exp.length != 0) {
				$('#delete-experiments-body-text').html(this.TEMPLATEDELETEEXP({
					'expID': exp.at(0).get('name'),
					'nrOfFiles': exp.at(0).get('files').length
				}));
				for(var i = 1; i<exp.length;i++) {
					this.$el.find('#delete-experiments-body-text').append(this.TEMPLATEDELETEEXP({
						'expID': exp.at(i).get('name'),
						'nrOfFiles': exp.at(i).get('files').length
					}));
				}
			}


			//display files to be deleted.
			var files = this.collection.getSelectedAndExperimentFiles();
			var fileNames = [];
			var expIDs = [];

			if(files.length != 0) {
				
				for(var i = 0; i<files.length;i++) {
					fileNames.push(files.at(i).get("filename"));
					expIDs.push(files.at(i).get("expId"));
				}

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
			}

		},
		deleteData: function() {
			var files = this.collection.getSelectedAndExperimentFiles();
			var experiments = this.collection.getSelectedExperiments();

			while(!files.isEmpty()) {
				files.at(0).destroy();
			}

			console.log(experiments);
			console.log(experiments.isEmpty());
			console.log(experiments.at(0));
			while(!experiments.isEmpty()) {
				//TODO DOESN'T SEND DELETE REQUEST TO API
				experiments.at(0).destroy();
				console.log(experiments);
			}

		},
		showButtons: function(fileArray) {

			var selectedFiles = this.collection.getSelectedFiles();
			var selectedExperiments = this.collection.getSelectedExperiments();
			//handles whether or not the upload or process buttons should be clickable.
			if(selectedExperiments.length > 0) {
				$('#upload_button').removeClass('disabled');
				$('#process_button').removeClass('disabled');

				//Makes sure there is two raw files in selected experiments and all have same species.
				var startSpecie = this.collection.getSpeciesForExperiment(selectedExperiments.at(0).get("name"));
				for(var i = 0; i < selectedExperiments.length; i++) {
					var specie = this.collection.getSpeciesForExperiment(selectedExperiments.at(i).get("name"));
					if(startSpecie != specie) {
						$('#process_button').addClass('disabled');
						break;
					}
					var expFiles = selectedExperiments.at(i).get("files");
					if(expFiles.length == 0) {
						$('#process_button').addClass('disabled');
						break;
					} else {
						var nrOfRawFiles = 0;
						for(var j = 0; j < expFiles.length;j++) {
							if(expFiles[j].type.toLowerCase() == "raw") {
								nrOfRawFiles++;
							}
						}
						if(nrOfRawFiles!=2) {
							$('#process_button').addClass('disabled');
							break;
						}
					}
				}
			} else {
				$('#upload_button').addClass('disabled');
				$('#process_button').addClass('disabled');
			}

			//handles whether or not the download or delete buttons should be clickable.
			if(selectedFiles.length > 0 || selectedExperiments.length > 0) {
				$('#delete_button').removeClass('disabled');

				$('#download_button').removeClass('disabled');
/*				for(var i = 0; i < selectedExperiments.length; i++) {
					if(selectedExperiments.at(i).get("files").length == 0) {
						$('#download_button').addClass('disabled', true);
						break;
					}
				}
*/			} else {
				$('#delete_button').addClass('disabled');
				$('#download_button').addClass('disabled');
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
			//Downloads all the selected files and experiments.
			var that = this;
			var URLsToDownload = this.collection.getSelectedAndExperimentURLs();
			// this is horrible but as we see it the only way to download multiple files

			if(URLsToDownload.length == 0) {
				app.messenger.warning("The experiments you selected contain no files to download.");
			} else {
				for (var i = 0; i < URLsToDownload.length; i++) {
					that.downloadURL(URLsToDownload[i]);
				};
			}

		},
		downloadURL: function(url) {

			// append token to url
			url += "&token=" + app.auth.get("token");
			
			var iframe = $(document.createElement('iframe'));
			//iframe.id = hiddenIFrameID;
			iframe.css('display', 'none');
			$(document.body).append(iframe);
			iframe.attr('src', url);
			iframe.ready(function() {
				setTimeout(function() {
					iframe.remove();
				}, 10000); // arbitrary amount of milliseconds :DDDD
			})
		},
		processSelected: function() {
			//TODO(?) does only work with selecting an experiment for processing not 
			//selecting raw files.
			var exps = this.collection.getSelectedExperiments();
			var specie = this.collection.getSpeciesForExperiment(exps.at(0).get("name"));
			var data = specie;
			for(var i = 0; i<exps.length; i++) {
				data += "," + exps.at(i).get("name");
			}

			app.router.navigate("process/"+data, {trigger:true});
		},
		openBuilder: function() {
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
