/**
 * A backbone collection of the Annotation model.
 */
define(['models/sysadmin/Annotation', 'models/sysadmin/Gateway'], function(Annotation, Gateway) {
	var Annotations = Backbone.Collection.extend({
		model : Annotation,
		url : Gateway.getURL() + "annotation",

		/**
		 * Filters this collection based on an input string. Items not matching
		 * the input are removed from the collection.
		 * @param {Object} searchString the string to filter by
		 */
		filterCollection : function(searchString) {
			var pattern = new RegExp(searchString, "i");
			var that = this;

			var toBeRemoved = [];
			var res = true;
			for (var i = 0; i < this.length; i++) {
				data = this.at(i);
				res = pattern.test(data.get('name'));
				if (res === false) {
					toBeRemoved.push(data);
				}
			}
			toBeRemoved.forEach(function(data) {
				that.remove(data);
			});
		},

		/**
		 * Finds the annotation with a specific name.
		 * @param {Object} name - the name of the annotaton
		 * @return {Object} annotation - the annotation with the given name or null
		 * if no annotation with the given name exists in this collection
		 */
		getAnnotationByName : function(name) {
			var annotation = null;
			for (var i = 0; i < this.length; i++) {
				if ((this.at(i).get('name')).toLowerCase() == name.toLowerCase()) {
					annotation = this.at(i);
					break;
				}
			}
			return annotation;
		},

		/**
		 * returns all the values of a specific annotation in this collection
		 * @param {Object} annotation - the name of the annotation
		 * @return {Object} values - the values of the specified annotation or -1 if
		 * it was not found
		 */
		getValuesOf : function(annotation) {
			var annotation = this.getAnnotationByName(annotation);
			if (annotation == null) {
				return -1;
			}
			return annotation.get('values');

		}
	},
	//static methods
	{

		/**
		 * Static method.
		 * Finds deleted values from two strings
		 * @param {Object} original - the original string
		 * @param {Object} modified - the modified string
		 * @return {Object} result - the deleted values
		 */
		findDeletedValues : function(original, modified) {
			var result = $(original).not(modified).get();
			if (result.length <= 0) {
				return -1;
			} else {
				return result;
			}
		},
		
		/**
		 * Static method.
		 * Finds added values from two strings
		 * @param {Object} original - the original string
		 * @param {Object} modified - the modified string
		 * @return {Object} result - the added values
		 */
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

