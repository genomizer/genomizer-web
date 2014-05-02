define(['models/Experiment'],function(Experiment) {
	var SearchResults = Backbone.Collection.extend({
/*		url: function() {
			//return 'http://genomizer.apiary.io/search/annotations=?' + this.query;
			return 'http://genomizer.apiary.io/search/annotations=?%3CpubmedStyleQuery%3E';
		},

*/		/*url: function() {
			$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
	      		options.url = 'http://genomizer.apiary.io/search/annotations=?' + options.url;
	    	});
			return '%3CpubmedStyleQuery%3E';
		},*/
		url: function() {
			return 'http://genomizer.apiary.io/search/annotations=?' + this.query;
		},
		model: Experiment,
		initialize:function (models,options) {
			this.query = options.query;
			var that = this;

			if(this.query !== undefined) {
			    this.fetch().success(function(res) {
			    	_.defer(function() {that.trigger("change");});
			    	console.log("SearchResults > fetch > success: ", res);
			    }).error(function(xhr, status, error) {
			    	console.log("SearchResults > fetch > error: ");
			    	var err = eval("(" + xhr.responseText + ")");
  					console.log(arguments[1] + " " + arguments[2]);
			    });
			}
			this.selectedFiles = [];

			this.on("fileSelect", this.fileSelectHandler, this);
		},
		fileSelectHandler: function(experiment, fileID, checked) {
			var file = experiment.files.get(fileID);
			if(checked) {
				this.selectFile(file);
			} else {
				this.deselectFile(file);
			}
		},
		selectFile: function(file) {
			console.log("SearchResults > selectFile > file: ", file);
			//Only one file may be selected at a time.
			this.selectedFiles = [file];
			this.trigger('highlightChange', this.selectedFiles);
		},
		deselectFile: function(file) {
			console.log("SearchResults > deselectFile > file: ", file);
			//Must take argument of which ID to remove when multiple files can be selected.
			this.selectedFiles = [];
			this.trigger('highlightChange', this.selectedFiles);
		},
		getSelectedFiles: function() {
			return this.selectedFiles;
		},
		setSearchQuery: function(query) {
			this.query = query;
			var that = this;
			this.fetch().success(function(res) {
					_.defer(function() {that.trigger("change");});
			    	console.log("SearchResults > fetch > success: ", res);
			    }).error(function(xhr, status, error) {
			    	console.log("SearchResults > fetch > error: ");
			    	var err = eval("(" + xhr.responseText + ")");
  					console.log(arguments[1] + " " + arguments[2]);
			    });/*.complete(function() {
			    	that.trigger('reRenderSearchResultsView', []);
			    });*/
		},
		getSelectedFileURLs: function() {
			var res = [];
			for(var i=0; i<this.selectedFiles.length; i++) {
				res.push(this.selectedFiles[i].get("URL"));
			}
			return res;
		}
	});
	return SearchResults;
});

