define([
	'collections/Files'
	],function(Files) {
	var Experiment = Backbone.Model.extend({

		defaults : {
			files : [],
			annotations: []
		},

		initialize: function() {
			
			this.on("sync", this.syncFiles, this);

			// the sync event wont fire if the constructor is fed with data
			this.syncFiles();
		},
		syncFiles: function() {
			this.files = new Files(this.get("files"));
		},
		getFiles: function() {
			return this.files;
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
