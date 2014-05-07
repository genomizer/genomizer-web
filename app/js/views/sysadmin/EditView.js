define(['text!templates/sysadmin/EditTemplate.html', 'models/sysadmin/Annotation', 'collections/sysadmin/Annotations', 'models/sysadmin/Gateway'], function(editTemplate, annotation, annotations, Gateway) {

	var EditView = Backbone.View.extend({
		el : '.page',
		events : {
			"click #updateAnnotation" : "updateAnnotation",
			"click #deleteAnnotation" : "deleteAnnotation"
		},

		updateAnnotation : function() {
			if ($('#edit_annotation_name').val() === "") {
				alert("Annotation name is required");
				return;
			}
			
			this.annotation.set({
				"name" : $('#edit_annotation_name').val()
			});

			this.annotation.set({
				"forced" : $('#edit_annotation_forced').val()
			});

			var temp = $('#edit_annotation_value').val();

			temp = temp.split(",");
			this.annotation.set({
				"type" : temp
			});

			this.annotation.set({
				"default" : temp[0]
			});

			alert("Annotation saved!");
		},

		deleteAnnotation : function() {
			var x = window.confirm("Are you sure you want to remove this annotation?");
			if (x) {
				var y = window.confirm("Annotation will be completely removed!");
				if (y) {
					var payload = new Backbone.Model();
					payload.set({
						'delete' : [this.annotation.get('name')]
					});

					var result = Gateway.deleteAnnotation(payload);

					alert("Annotation removed!");
				}
			}
		},

		setLocalAnnotation : function(annotation, annotations) {
			this.annotation = annotation;
			this.annotations = annotations;
		},

		render : function(annotation, annotations) {
			var template = _.template(editTemplate, {
				annotation : annotation,
				annotations : annotations
			});

			$('.list').empty();
			this.$el.html(template);
			
			if (annotation.get('value') == 'freetext') {
				$('#edit_annotation_value').attr('disabled', '');
			} else {
				$('#edit_annotation_value').removeAttr('disabled');
			}
		},
		initialize : function() {
		}
	});
	return EditView;
});
