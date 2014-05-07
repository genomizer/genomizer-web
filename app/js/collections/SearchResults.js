define(['models/Experiment'],function(Experiment) {
	var SearchResults = Backbone.Collection.extend({
		url: function() {
			return 'http://genomizer.apiary.io/search/?annotations=' + this.query;
		},
		model: Experiment,
		initialize:function (models,options) {
			this.query = options.query;
			//this.fetching=true;
			if(options.query != undefined) {
				console.log("It's defined!: " + this.query);
				this.fetchModels(options.query, this);
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
		fetchModels: function(query, that) {
			console.log('fetching models');
			that.fetching = true;
			that.trigger('change');

			this.fetch().success(function(res) {
				console.log("SearchResults > fetch > success: ", res);
				if(that.models.length == 0) {
					console.log("Empty array");
				} else {
					console.log("non empty array");
				}
				that.fetching = false;
				that.trigger('change');
			}).error(function(xhr, status, error) {
				that.reset([]);
				that.fetching = false;
				that.trigger('change');
			});
		},
		setSearchQuery: function(query) {
			this.query = query;
			this.fetchModels(query, this);
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

