define([], function() {
	var Annotation = Backbone.Model.extend({
		defaults : {
			"name" : "Not defined",
			"values" : "Not defined",
			"forced" : "false"

		},
		initialize : function() {
		},
	});
	return Annotation;
});

