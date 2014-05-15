define(['models/sysadmin/Annotation', 'models/sysadmin/Gateway'], function(Annotation, Gateway) {
	var Annotations = Backbone.Collection.extend({
		model : Annotation,
		url : Gateway.getURL() + "annotation",

		filterCollection : function(searchString) {
			var pattern = new RegExp(searchString, "i");
			var that = this;
			
			var toBeRemoved = [];
			var res = true;
			for (var i = 0; i < this.length; i++) {
				data = this.at(i);
				res = pattern.test(data.get('name'));
				if(res === false){
					toBeRemoved.push(data);
				}
			}	
			toBeRemoved.forEach(function(data){
				that.remove(data);		
			});		
		},

		getAnnotationByName : function(name) {
			var annotation = null;
			for (var i = 0; i < this.length; i++) {
				if (this.at(i).get('name') == name) {
					annotation = this.at(i);
					break;
				}
			}
			return annotation;
		}
	}, 
	//static methods
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



