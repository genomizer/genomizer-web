define([
	'models/AnnotationType'
],function(AnnotationType) {
	var AnnotationTypes = Backbone.Collection.extend({
		url: 'http://scratchy.cs.umu.se:8000/api/annotation',
		model: AnnotationType,
		defaults : {
			
		},
		initialize:function () {

		}

	});
	return AnnotationTypes;
});
