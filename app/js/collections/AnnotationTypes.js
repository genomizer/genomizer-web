define([
	'models/AnnotationType'
],function(AnnotationType) {
	var AnnotationTypes = Backbone.Collection.extend({
		url: app.BASE_URL + 'annotation',
		model: AnnotationType,
		initialize:function () {

		},
<<<<<<< HEAD
		getAnnotation: function(name) {
			for (var i = 0; i < this.length; i++) {
				var annotation = this.at(i);
				if(annotation.get("name") == name) {
					return annotation;
				}
			}	
			return {};
		},
=======
		/*
		 * Return a new annotationsType with the ExpID annotation excluded
		 */
		withoutExpID: function() {
			return new AnnotationTypes(this.reject(function(ann) {
				return ann.get("name") == "ExpID"; 
			}));
		}
>>>>>>> c8450621b21b774135a297b74838fe3928b388f3

	});
	return AnnotationTypes;
});
