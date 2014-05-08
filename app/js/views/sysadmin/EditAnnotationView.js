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
                    tempAnnotation = new Annotation();
                    
                    tempAnnotation.set({"id":this.annotation.get('id'),"values":[]});
                    
                    var innerPayload = tempAnnotation.toJSON();
                    
                    delete innerPayload.name;
                    delete innerPayload.type;
                    delete innerPayload.forced;
                    
                    payload.set({
                        'deleteId' : [innerPayload]
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

			this.setLocalAnnotation(annotation, annotations);
			
            var template = _.template(EditTemplate, {
                annotation : annotation,
                annotations : annotations
            });

            this.$el.html(template);
            if (annotation.get('value') == 'freetext') {
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


