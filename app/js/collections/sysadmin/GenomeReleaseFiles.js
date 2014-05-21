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

		comparator : function(model) {
			if (this._order_by == 'genomeVersion')
				return model.get('genomeVersion');
			else if (this._order_by == 'fileName')
				return model.get('fileName');
			else
				return model.get('specie');
		}, 
		
		orderBy: function(sortString) {
			this._order_by = sortString;
			this.sort();
		}, 
		
		_order_by: 'specie',
		
		getForSpecies: function(specie) {
			var gfs = this.filter(function(gr) {
				return gr.get("specie").toLowerCase() == specie.toLowerCase();
			});
			return new GenomeReleaseFiles(gfs);
		}

	});
	return GenomeReleaseFiles;
});

