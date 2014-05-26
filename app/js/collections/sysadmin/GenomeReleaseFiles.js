define(['models/sysadmin/GenomeReleaseFile', 'models/sysadmin/Gateway'], function(GenomeReleaseFile, Gateway) {
	var GenomeReleaseFiles = Backbone.Collection.extend({
		model : GenomeReleaseFile,
		url : Gateway.getURL() + "genomeRelease",

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
				return gr.get("species").toLowerCase() == specie.toLowerCase();
			});
			return new GenomeReleaseFiles(gfs);
		}

	});
	return GenomeReleaseFiles;
});

