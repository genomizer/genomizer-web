define(['models/GenomeReference'],function(GenomeReference) {
	var GenomeReferences = Backbone.Collection.extend({
		url: function() {
			return app.BASE_URL + 'genomeRelease/' + this.species;
		},
		model: GenomeReference,
		initialize:function (options) {
			this.species = options.species;
			var that = this;


		}
	});
	return GenomeReferences;
});

