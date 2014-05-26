define(['models/sysadmin/GenomeReleaseFile', 'models/sysadmin/Gateway'], function(GenomeReleaseFile, Gateway) {
	var GenomeReleaseFiles = Backbone.Collection.extend({
		model : GenomeReleaseFile,
		url : Gateway.getURL() + "genomeRelease",

		addFilesByFileObject: function(fileObjects) {
			var that = this;
			_.each(fileObjects,function(fileObj) {
				var file = new GenomeReleaseFile({
					fileName:fileObj.name
				});
				file.fileObj = fileObj;
				that.add(file);
			});

		},
		
		uploadGenomeReleaseFiles : function(data) {
			// array URL
			
			var i = 0;
			_.forEach(this.models, function(file) {
				file.setUploadURL(data[i].URLupload);
				i++;
				file.uploadGenomeReleaseFile();
			});
			
		},
		
		hasUnfinishedUploads: function() {
			var aNotDoneUpload = this.find(function(f) {
				return !f.uploadDone;
			});
			return aNotDoneUpload !== undefined;
		},
		
		/*
		 * returns the total size of the files to be uploaded
		 */
		getTotalUploadFileSize: function() {
			var size = 0;
			this.each(function(f) {
				if(f.isFileUpload()) {
					size += f.getFileSize();
				}
			});
			return size;
			
		},
		
		/*
		 * Get the total upload progress as a value between 0 and 1
		 */
		getTotalUploadProgress: function() {
			if(this.getTotalUploadFileSize() == 0) {
				return 1;
			}
			var uploadedSize = 0;
			this.each(function(f) {
				if(f.isFileUpload()) {
					uploadedSize += f.getFileSize() * f.progress;
				}
			});
			return uploadedSize / this.getTotalUploadFileSize();
		},
		
		setFileInfo : function(specie, genomeVersion) {
			this.specie = specie;
			this.genomeVersion = genomeVersion;
		},
		
		getSpecie : function() {
			return this.specie;
		},
		
		getGenomeReleaseByName : function(name) {
			var genomeReleaseFile = null;
			for (var i = 0; i < this.length; i++) {
				if ((this.at(i).get('fileName')).toLowerCase() == name.toLowerCase()) {
					genomeReleaseFile = this.at(i);
					break;
				}
			}
			return genomeReleaseFile;
		},
		
		getFileNames : function(){
			var result = [];
			for (var i = 0; i < this.length; i++) {
				result.push(this.at(i).get('fileName'));
			}
			return result;
		},
		
		getFolderPaths : function(){
			var result = [];
			for (var i = 0; i < this.length; i++) {
				result.push(this.at(i).get('folderPath'));
			}
			return result;
		},

		comparator : function(model) {
			if (this._order_by == 'genomeVersion')
				return model.get('genomeVersion');
			else
				return model.get('species');
		}, 
		
		orderBy: function(sortString) {
			this._order_by = sortString;
			this.sort();
		}, 
		
		_order_by: 'specie',
		
		getForSpecies: function(specie) {
			var gfs = this.filter(function(gr) {
				return gr.get("species").toLowerCase() == specie.toLowerCase();
			});
			return new GenomeReleaseFiles(gfs);
		},
		
		getPayload : function() {
			var payload = new Backbone.Model();
			payload.set({"genomeVersion": this.genomeVersion, "specie" : this.specie, "files":this.getFileNames()});
			return payload;
		}

	});
	return GenomeReleaseFiles;
});

