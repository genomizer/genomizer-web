/**
 * A view class for edit an existing annotation
 */
define(['text!templates/sysadmin/EditTemplate.html', 
		'models/sysadmin/Annotation', 'collections/sysadmin/Annotations', 
		'models/sysadmin/Gateway'], 
function(EditTemplate, Annotation, Annotations, Gateway) {
	var EditView = Backbone.View.extend({
		events : {
			"click #updateAnnotation" : "updateAnnotation",
			"click #deleteAnnotation" : "deleteAnnotation"
		},

		/**
		 * This gets called on Update Annotation button.
		 * It will get all information from the form and check it against
		 * the old values to determine what was changed, then calls Gateway
		 * to send the appropriate packets to the server.
		 */
		updateAnnotation : function() {
			if ($('#edit_annotation_name').val() === "") {
				alert("Annotation name is required");
				return;
			}
			if ($('#edit_annotation_value').val() === "") {
				alert("Annotation value is required");
				return;
			}

			var originalName = this.annotation.get('name');
			var newName = $('#edit_annotation_name').val();

			var original = this.annotation.get('values');
			var modified = $('#edit_annotation_value').val();

			modified = modified.split(",");

			var deletedResult = Annotations.findDeletedValues(original, modified);
			var addedResult = Annotations.findAddedValues(original, modified);
			Gateway.updateAnnotationValues(deletedResult, addedResult, originalName, newName);

			if (originalName != newName) {
				var renamePayload = new Backbone.Model();
				renamePayload.set({
					"newName" : newName,
					"oldName" : originalName
				});
				Gateway.renameAnnotation(renamePayload);
			}
			history.back();
		},

		/**
		 * Displays a popup to confirm deletion of annotation, then if positive
		 * tell the Gateway to send delete packet
		 */
		deleteAnnotation : function() {
			var x = window.confirm("Are you sure you want to remove this annotation?");
			if (x) {
				Gateway.deleteAnnotation({}, this.annotation.get('name'), true);
			}
		},

		/**
		 * Sets the local variables to the parameters
		 * @param {Object} annotation - the annotation to be edited
		 * @param {Object} annotations - the complete collection
		 */
		setLocalAnnotation : function(annotation, annotations) {
			this.annotation = annotation;
			this.annotations = annotations;
		},

		render : function(annotation, annotations) {
			this.setLocalAnnotation(annotation, annotations);

			var template = _.template(EditTemplate, {
				annotation : annotation,
				annotations : annotations
			});

			$('.activePage').html(template);
			if (annotation.get('values') == 'freetext' || annotation.get('values')[0] == "Yes") {
				$('#edit_annotation_value').attr('disabled', '');
			} else {
				$('#edit_annotation_value').removeAttr('disabled');
			}
		},

		initialize : function() {
			var annotation;
			var that = this;
			annotations = new Annotations();
			annotations.fetch({
				success : function(annotations) {
					annotation = annotations.getAnnotationByName(that.id);
					that.render(annotation, annotations);
				}
			});
		}
	});
	return EditView;
});

