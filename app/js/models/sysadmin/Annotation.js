/**
 * A model used to represent an annotation.
 */
define([], function() {
	var Annotation = Backbone.Model.extend({
		defaults : {
			"name" : "Not defined",
			"values" : "Not defined",
			"forced" : "false"

		},
	});
	return Annotation;
});

