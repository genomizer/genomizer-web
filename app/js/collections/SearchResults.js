define(['models/Experiment'],function(Experiment) {
	var SearchResults = Backbone.Collection.extend({
		url: function() {
			return 'http://genomizer.apiary.io/search/annotations=?' + this.query;
		},
		model: Experiment,
		initialize:function (models,options) {
			this.query = options.query;
			if(this.query !== undefined) {
			     this.fetch();
			}
			this.selectedFiles = [];
		},
		selectFile: function(file) {
			//Only one file may be selected at a time.
			this.selectedFiles = [file];
			this.trigger('highlightChange', [this.selectedFiles]);
		},
		deselectFile: function() {
			//Must take argument of which ID to remove when multiple files can be selected.
			this.selectedFiles = [];
			this.trigger('highlightChange', [this.selectedFiles]);
		},
		getSelectedFiles: function() {
			return this.selectedFiles;
		},
		getSelectedFileURLs: function() {
			var res = [];
			for(var i=0;i<this.selectedFiles;i++) {
				res[i] = this.selectedFiles[i].get("URL");
			}
			return res;
		}
	});
	return SearchResults;
});
