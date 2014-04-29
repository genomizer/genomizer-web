define([],function() {
	var Experiment = Backbone.Model.extend({
		defaults : {
			fileName: "unnamed",
			fileId: -1
			size: "0gb"
			type: "raw"
			uploadedBy: "user"
			date: "2014-04-25"
			URL: "URLtofile"
			files: {
				raw: [],
				region: [],
				profile: []
			}
		},
		initialize: function() {
			this.hatt = 3;
			this.set({sex:"Female"});
		}
	});
	return Experiment;
});
