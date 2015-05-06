define(['models/Experiment'],function(Experiment) {
	var Experiments = Backbone.Collection.extend({
		url: app.BASE_URL + 'experiment',
		model: Experiment,
		initialize:function () {
		},
		hasUploadable: function() {
			var aUpload = this.find(function(f) {
				return f.isUploadable();
			});
			return aUpload !== undefined
		},
		destroyAllExperiments: function() {
			while(!this.isEmpty()) {
				// Fix to force correct DELETE response
				// setting idAttribute to name, (we dont do it in experiment,
				// as this would casue the wrong response when adding
				// experiment)
				this.at(0).idAttribute = 'name';

				this.at(0).id =  this.at(0).get('name');

				// Using /api/this instead of /api/searchResults
				this.at(0).urlRoot = this.url;

				this.at(0).destroy();
			}
		}
	});
	return Experiments;
});
