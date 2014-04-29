define([
	'models/AnnotationType'
],function(AnnotationType) {
	var AnnotationTypes = Backbone.Collection.extend({
		url: '/api/annotation/',
		model: AnnotationType,
		initialize:function () {

		}

	});
	return AnnotationTypes;
});
