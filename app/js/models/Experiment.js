define([
	'collections/Files'
	],function(Files) {
	var Experiment = Backbone.Model.extend({

		initialize: function() {
			this.files = new Files(this.get("files"));
			
		},
		getAnnotation: function(id) {
			for (var i = 0; i < this.attributes.annotations.length; i++) {
				if(this.attributes.annotations[i].id == id) {
					return this.attributes.annotations[i];
				}
			}
			return undefined;
		}
	});
	return Experiment;
});
