define([
	'collections/SearchResults',
	'views/search/SearchResultsView',
	'collections/AnnotationTypes',
	'text!views/search/searchInputGroup.html'
],function(SearchResults, SearchResultsView, AnnotationTypes, inputGroupTemplate) {

	var Search = Backbone.View.extend({

		TEMPLATE: _.template(inputGroupTemplate + '<section id="search_results_view"></section>'),
		initialize: function(options) {

			this.collection = new SearchResults([/*
   {
    "name": "experimentName",
    "created by": "user",
    "files": [
              {
               "id": "file-id1", 
               "type": "raw",
               "name": "file1.wig",
               "uploadedBy": "user",
               "date": "2014-04-22",
               "size": "1.3gb",
               "URL": "URLtofile"
              },
              {
               "id": "file-id2", 
               "type": "profile",
               "name": "file2.as",
               "uploadedBy": "user",
               "date": "2014-04-22",
               "size": "1.3gb",
               "URL": "URLtofile"
              }, 
              {
               "id": "file-id3", 
               "type": "region",
               "name": "file3.df",
               "uploadedBy": "user",
               "date": "2014-04-22",
               "size": "1.3gb",
               "URL": "URLtofile"
              }, 
             ],
    "annotations": 
                 [
                 {
                  "id": "1", 
                  "name": "pubmedId",
                  "value": "abc123"
                 }, 
                 {
                  "id": "2",
                  "name": "type",
                  "value": "raw"
                 },
                 {
                  "id": "3",
                  "name": "specie",
                  "value": "human"
                 },
                 {
                  "id": "4",
                  "name": "genome release",
                  "value": "v.123"
                 },
                 {
                  "id": "5",
                  "name": "cell line",
                  "value": "yes"
                 },
                 {
                  "id": "6",
                  "name": "development stage",
                  "value": "larva"
                 },
                 {
                  "id": "7",
                  "name": "sex",
                  "value": "male"
                 },
                 {
                  "id": "8",
                  "name": "tissue",
                  "value": "eye"
                 }
                 ]
    },
    {
    "name": "experimentName",
    "created by": "user",
    "files": [
              {
               "id": "file-id1", 
               "type": "raw",
               "name": "file1.wig",
               "uploadedBy": "user",
               "date": "2014-04-22",
               "size": "1.3gb",
               "URL": "URLtofile"
              },
              {
               "id": "file-id2", 
               "type": "profile",
               "name": "file2.as",
               "uploadedBy": "user",
               "date": "2014-04-22",
               "size": "1.3gb",
               "URL": "URLtofile"
              }, 
              {
               "id": "file-id3", 
               "type": "region",
               "name": "file3.df",
               "uploadedBy": "user",
               "date": "2014-04-22",
               "size": "1.3gb",
               "URL": "URLtofile"
              } 
             ],
    "annotations": 
                 [
                 {
                  "id": "1", 
                  "name": "pubmedId",
                  "value": "abc123"
                 }, 
                 {
                  "id": "2",
                  "name": "type",
                  "value": "raw"
                 },
                 {
                  "id": "3",
                  "name": "specie",
                  "value": "human"
                 },
                 {
                  "id": "4",
                  "name": "genome release",
                  "value": "v.123"
                 },
                 {
                  "id": "5",
                  "name": "cell line",
                  "value": "yes"
                 },
                 {
                  "id": "6",
                  "name": "development stage",
                  "value": "larva"
                 },
                 {
                  "id": "7",
                  "name": "sex",
                  "value": "male"
                 },
                 {
                  "id": "8",
                  "name": "tissue",
                  "value": "eye"
                 }
                 ]
    }
*/], {query:options.query});

			this.resultsView = new SearchResultsView({
				collection: this.collection,
				annotations: app.annotationTypes
			});
      this.collection.on("highlightChange", this.showDownloadAndProcessButtons, this);
			this.render();
		},
		el: $("#search"),
		render: function() {
			this.$el.html(this.TEMPLATE());

			this.$el.find('#results_container').append(this.resultsView.$el);
		},
		events: {
			"click #search_button": "doSearch",
			"keyup #search_input": "showSearchButton",
			"click #download_button": "downloadSelected",
			"click #process_button": "processSelected"
		},
    showDownloadAndProcessButtons: function(fileArray) {
      if(fileArray.length != 0) {
        $('#download_button').prop('disabled', false);
      } else {
        $('#download_button').prop('disabled', true);
      }
      if(fileArray.length == 1 && fileArray[0].get("type") == "raw") {
        $('#process_button').prop('disabled', false);
      } else {
        $('#process_button').prop('disabled', true);
      }
    },
		showSearchButton: function() {
			if($('#search_input').val().length != 0) {
				$('#search_button').prop('disabled', false);
			} else {
				$('#search_button').prop('disabled', true);
			}

		},
		doSearch: function() {
			console.log("In doSearch: Searching for "+$('#search_input').val() +'.');
			//searchResults skickar AJAX REQUEST och uppdaterar innehållet i dess container.
      app.router.navigate('search/' + $('#search_input').val(), {trigger:true});
			this.collection.setSearchQuery($('#search_input').val());
		},
		downloadSelected: function() {
			//Create hidden downloader
			var downloadURL = function downloadURL(url) {
			    var hiddenIFrameID = 'hiddenDownloader',
				iframe = document.getElementById(hiddenIFrameID);
			    if (iframe === null) {
				iframe = document.createElement('iframe');
				iframe.id = hiddenIFrameID;
				iframe.style.display = 'none';
				document.body.appendChild(iframe);
			    }
			    iframe.src = url;

			};

      var URLsToDownload = this.collection.getSelectedFileURLs();
      for (var i = 0; i < URLsToDownload.length; i++) {
        alert('Starting to download from url: '+URLsToDownload[i]);
        downloadURL(URLsToDownload[i]);
      };

		},
		processSelected: function() {
			app.router.navigate("process", {trigger:true});
			//alert("process");

			//alert("processing "+$(searchResults.getSelectedFileID()));
			//TODO skicka fileID till process (BARSK)
		}
		
	});
	return Search;
});

