define(['text!templates/sysadmin/EditTemplate.html', 'models/sysadmin/Annotation', 'collections/sysadmin/Annotations', 'models/sysadmin/Gateway'], function(EditTemplate, Annotation, Annotations, Gateway) {

    var EditView = Backbone.View.extend({
        events : {
            "click #updateAnnotation" : "updateAnnotation",
            "click #deleteAnnotation" : "deleteAnnotation"
        },

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
				renamePayload.set({"name" : originalName, "newName" : newName});
				Gateway.renameAnnotation(renamePayload);
			}
			history.back();
        },

        deleteAnnotation : function() {
            var x = window.confirm("Are you sure you want to remove this annotation?");
            if (x) {
                var y = window.confirm("Annotation will be completely removed!");
                if (y) {
                    Gateway.deleteAnnotation({}, this.annotation.get('name'), true);
                }
            }
        },

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


