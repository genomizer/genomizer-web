define([
	'models/AnnotationType'
],function(AnnotationType) {
	var AnnotationTypes = Backbone.Collection.extend({
		url: '/api/annotation/',
		model: AnnotationType,
		defaults : {
			
		},
		initialize:function () {

		}

	});
	return AnnotationTypes;
});
