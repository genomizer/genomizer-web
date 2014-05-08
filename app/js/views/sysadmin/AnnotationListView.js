define(['collections/sysadmin/Annotations', 'text!templates/sysadmin/AnnotationListTemplate.html', 'models/sysadmin/Annotation'], function(Annotations, annotationListTemplate, Annotation) {
	var AnnotationListView = Backbone.View.extend({
		render : function(annotations, fetch) {
			if (!fetch) {
				var template = _.template(annotationListTemplate, {
					annotations : annotations.models
				});
				$('.page').html(template);
			} else {
				var that = this;

				annotations.fetch({
					success : function(annotations) {
						var template = _.template(annotationListTemplate, {
							annotations : annotations.models
						});
						$('.page').html(template);
					}
				});
			}
		},

		initialize : function(items) {
			this.itemList = items;
		},

		filter : function(searchParam) {
			return this.itemList.filterCollection(searchParam);
		}
	});
	return AnnotationListView;
});

