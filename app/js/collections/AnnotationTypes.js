define([
	'models/AnnotationType'
],function(AnnotationType) {
	var AnnotationTypes = Backbone.Collection.extend({
		url: app.BASE_URL + 'annotation',
		model: AnnotationType,
		defaults : {
			
		},
		initialize:function () {

		}

	});
	return AnnotationTypes;
});
