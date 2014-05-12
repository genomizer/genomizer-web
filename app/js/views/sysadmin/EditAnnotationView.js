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

			var original = this.annotation.get('values');
            var modified = $('#edit_annotation_value').val();

            modified = modified.split(",");

			var deletedResult = Annotations.findDeletedValues(original, modified);
			if (deletedResult != -1) {
				Gateway.deleteAnnotationValues(deletedResult, this.annotation.get('id'));
			}
			// var addedResult = Annotations.findAddedValues(original, modified);
			// if (addedResult != -1) {
				// Gateway.addAnnotationValues(addedResult, this.annotation.get('id'));
			// }

            alert("Annotation saved!");
        },

        deleteAnnotation : function() {
            var x = window.confirm("Are you sure you want to remove this annotation?");
            if (x) {
                var y = window.confirm("Annotation will be completely removed!");
                if (y) {
                    var payload = new Backbone.Model();
                    
                    //delete /annotation/{id}
                    
                    Gateway.deleteAnnotation(payload, this.annotation.get('id'));

					// tempAnnotation = new Annotation();
//                     
                    // tempAnnotation.set({"id":this.annotation.get('id'),"values":[]});
//                     
                    // var innerPayload = tempAnnotation.toJSON();
//                     
                    // delete innerPayload.name;
                    // delete innerPayload.type;
                    // delete innerPayload.forced;
//                     
                    // payload.set({
                        // 'deleteId' : [innerPayload]
                    // });
// 
                    // var result = Gateway.deleteAnnotation(payload);

					history.back();
                    alert('Annotation deleted');
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
            if (annotation.get('values') == 'freetext') {
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
                    annotation = annotations.getAnnotationByID(that.id);
                    that.render(annotation, annotations);
                }
            });
        }
    });
    return EditView;
});


