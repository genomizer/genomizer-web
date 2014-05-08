define(['models/sysadmin/Annotation', 'models/sysadmin/Gateway'], function(Annotation, Gateway) {
	var Annotations = Backbone.Collection.extend({
		model : Annotation,
		url : Gateway.getURL() + "/annotation",

		filterCollection : function(searchString) {
			if (searchString == "")
				return this;

			var pattern = new RegExp("^" + searchString, "gi");
			return new Backbone.Collection((this.filter(function(data) {
					return pattern.test(data.get("name"));
				})));
		},
		
		getAnnotationByID : function(id) {
			var annotation;
			for (var i = 0; i < this.length; i++) {
				if (this.at(i).get('id') == id) {
					annotation = this.at(i);
					console.log(annotation);
					return annotation;
				}
			}
		}
	});
	return Annotations;
}); 


