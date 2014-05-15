define([
	'models/AnnotationType'
],function(AnnotationType) {
	var AnnotationTypes = Backbone.Collection.extend({
		url: app.BASE_URL + 'annotation',
		model: AnnotationType,
		defaults : {
			
		},
		initialize:function () {

		},
		getAnnotation: function(name) {
			for (var i = 0; i < this.length; i++) {
				var annotation = this.at(i);
				if(annotation.get("name") == name) {
					return annotation;
				}
			}	
			return {};
		},

	});
	return AnnotationTypes;
});
