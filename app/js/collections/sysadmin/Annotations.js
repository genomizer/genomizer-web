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
			var annotation = null;
			for (var i = 0; i < this.length; i++) {
				if (this.at(i).get('id') == id) {
					annotation = this.at(i);
					break;
				}
			}
			return annotation;
		}
	}, 
	
	{
		findDeletedValues : function(original, modified) {
			var result = $(original).not(modified).get();
			if (result.length <= 0) {
				return -1;
			} else {
				return result;
			}
		},

		findAddedValues : function(original, modified) {
			var result = $(modified).not(original).get();
			if (result.length <= 0) {
				return -1;
			} else {
				return result;
			}
		}
	});
	return Annotations;
});



