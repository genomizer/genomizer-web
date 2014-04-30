define([
	'models/AnnotationType'
],function(AnnotationType) {
	var AnnotationTypes = Backbone.Collection.extend({
		url: 'http://genomizer.apiary.io/annotation',
		model: AnnotationType,
		initialize:function () {

		}

	});
	return AnnotationTypes;
});
