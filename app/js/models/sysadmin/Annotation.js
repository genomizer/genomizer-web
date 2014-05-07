define([], function() {
	var Annotation = Backbone.Model.extend({
		defaults : {
			"id" : "0",
			"name" : "Not specified",
			"value" : "Not specified",
			"forced" : "false"

		},
		initialize : function() {
		},
	});
	return Annotation;
});


