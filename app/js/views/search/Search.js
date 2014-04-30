define([
	'collections/SearchResults',
	'views/search/SearchResultsView',
	'collections/AnnotationTypes',
	'text!views/search/searchInputGroup.html'
],function(SearchResults, SearchResultsView, AnnotationTypes, inputGroupTemplate) {

	var Search = Backbone.View.extend({

		TEMPLATE: _.template(inputGroupTemplate + '<section id="search_results_view"></section>'),
		initialize: function(options) {

			var annotationTypes = new AnnotationTypes([
 {
  "id": "1", 
  "name": "pubmedId",
  "value": "freetext",
  "forced": "false"
 }, 
 {
  "id": "2",
  "name": "type",
  "value": "freetext",
  "forced": "false"
 },
 {
  "id": "3",
  "name": "specie",
  "value": ["fly", "human", "rat"],
  "forced": "true"
 },
 {
  "id": "4",
  "name": "genome release",
  "value": "freetext",
  "forced": "false"
 },
 {
  "id": "5",
  "name": "cell line",
  "value": ["yes", "no"],
  "forced": "true"
 },
 {
  "id": "6",
  "name": "development stage",
  "value": ["larva", "larvae"],
  "forced": "true"
 },
 {
  "id": "7",
  "name": "sex",
  "value": ["male", "female", "unknown"],
  "forced": "true"
 },
 {
  "id": "8",
  "name": "tissue",
  "value": ["eye", "leg"],
  "forced": "true"
 }
]);

			this.collection = new SearchResults([
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
    }
],{query:options.query});

			this.resultsView = new SearchResultsView({
				collection: this.collection,
				annotations: annotationTypes
			});
			this.render();
		},
		el: $("#search"),
		render: function() {
			this.$el.html(this.TEMPLATE());

			this.$el.find('#results_container').append(this.resultsView.$el);
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
			} else {
				$('#search_button').prop('disabled', true);
			}

		},
		doSearch: function() {
			alert("Searching for "+$('#search_input').val() +'.');
			//searchResults skickar AJAX REQUEST och uppdaterar innehållet i dess container.
			searchResults.setSearchQuery($('#search_input').val());
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
			alert("download");

			//alert("downloading "+$(searchResults.getSelectedFileID()));
			//TODO AJAX download REQUEST (GET /file/<file-id>), authorization: token

			

			//downloadURL(xmlhttp.open("GET", "/file/"$(searchResults.getSelectedFileID()),true));
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


