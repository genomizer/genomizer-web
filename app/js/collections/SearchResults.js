define([
	'models/Experiment',
	'collections/Experiments',
	'collections/Files'
],function(Experiment, Experiments, Files) {
	var SearchResults = Backbone.Collection.extend({
		url: function() {
			return app.BASE_URL + 'search/?annotations=' + this.query;
		},
		model: Experiment,
		initialize:function (models,options) {
			this.query = options.query;

			if(options.query != undefined) {
				this.fetchModels(options.query);

			}
			this.selectedFiles = new Files();
			this.selectedExperiments = new Experiments();

			this.on("fileSelect", this.fileSelectHandler, this);
			this.on("experimentSelect", this.experimentSelectHandler, this);
		},
		fileSelectHandler: function(file, checked) {
			if(checked) {
				this.selectFile(file);
			} else {
				this.deselectFile(file);
			}
		},
		experimentSelectHandler: function(experiment, checked) {
			if(checked) {
				this.selectExperiment(experiment);
			} else {
				this.deselectExperiment(experiment);
			}
		},
		selectFile: function(file) {
			if(!this.selectedFiles.contains(file)) {
				this.selectedFiles.add(file);
				this.trigger('highlightChange');
			}
		},
		deselectFile: function(file) {
			if(this.selectedFiles.contains(file)) {
				this.selectedFiles.remove(file);
				this.trigger('highlightChange');
			}
		},
		getSelectedFiles: function() {
			return this.selectedFiles;
		},
		getSelectedFileURLs: function() {
			var res = [];
			for(var i=0; i<this.selectedFiles.length; i++) {
				res.push(this.selectedFiles.at(i).get("url"));
			}
			return res;
		},
		isFileSelected: function(fileID) {
			return this.selectedFiles.get(fileID) != undefined;
		},
		selectExperiment: function(experiment) {
			if(!this.selectedExperiments.contains(experiment)) {
				this.selectedExperiments.add(experiment);
				this.trigger('highlightChange');
			}
		},
		deselectExperiment: function(experiment) {
			if(this.selectedExperiments.contains(experiment)) {
				this.selectedExperiments.remove(experiment);
				this.trigger('highlightChange');
			}
		},
		getSelectedExperiments: function() {
			return this.selectedExperiments;
		},
		isExperimentSelected: function(experimentID) {
			return this.selectedExperiments.get(experimentID) != undefined;
		},
		experimentHasSelectedFiles: function(experimentCID) { // we have to use the CID as experiments dont have IDs on the server
			var experiment = this.get(experimentCID);
			if(experiment != undefined) {
				for (var i = 0; i < experiment.files.length; i++) {
					if(this.isFileSelected(experiment.files.at(i).get("id"))) {
						return true;
					}
				}
			}
			
			return false;
			
		},
		getSelectedandExperimentFiles: function() {
			var files = new Files();

			files.set(this.selectedFiles);

			this.selectedExperiments.each(function(experiment) {
				files.set(experiment.files);
			})

			return files;
		},
		getSpeciesForExperiment: function(expID) {

			var attribs;
			var retVal;
			_.each(this.models, function(c){
				if(c.get("name") == expID) {
					attribs = c.get("annotations");
					for(var i = 0; i < attribs.length; i++) {
						if(attribs[i].name == "Species") {
							retVal = attribs[i].value;
							return;
						}
					}
				}
			}, this);
			return retVal;
		},
		fetchModels: function(query) {

			if(this.selectedExperiments != undefined) {
				this.selectedExperiments.reset();	
			}
			if(this.selectedFiles != undefined) {
				this.selectedFiles.reset();	
			}

			this.fetching = true;
			this.trigger('change');

			var that = this;

			this.fetch().success(function(res) {
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
			this.fetchModels(query);
		}
	});
	return SearchResults;
});

