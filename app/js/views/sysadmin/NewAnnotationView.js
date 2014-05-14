define(['text!templates/sysadmin/NewAnnotationTemplate.html',
		'models/sysadmin/Annotation',
		'models/sysadmin/Gateway',
		'views/sysadmin/ConfirmAnnotationModal'
],function(newAnnotationTemplate, Annotation, Gateway, ConfirmAnnotationModal) {
	var NewAnnotationView = Backbone.View.extend({
		render : function() {
			var template = _.template(newAnnotationTemplate);
			$('.activePage').html(template);
		},

		initialize : function() {
			this.render();
		},

		events : {
			"click #submit" : "submit",
			"change #annotation_type" : "checkAnnotationType"
		},

		submit : function() {
			if ($('#annotation_name').val() === "") {
				alert("Some required fields are empty");
				return;
			}

			var output = [];
			annotation = new Annotation();
			annotation.set({
				"name" : $('#annotation_name').val()
			});
			output.push($('#annotation_name').val()); 

			switch($('#annotation_forced').val()) {
				case "one":
					annotation.set({
						"forced" : "true"
					});
					output.push('Yes');
					break;
				case "two":
					annotation.set({
						"forced" : "false"
					});
					output.push('No');
					break;
			}

			switch($('#annotation_type').val()) {
				case "one":
					annotation.set({
						"type" : ["yes", "no"],
						"default" : "yes"
					});
					output.push('Yes/No');
					break;
				case "two":
					var temp = $('#itemlist_input').val();
					temp = temp.split(",");
					annotation.set({
						"type" : temp,
						"default" : temp[0]
					});
					output.push('Drop-down list');
					output.push(temp);
					break;
				default:
					annotation.set({
						"type" : ["freetext"],
						"default" : ""
					});
					output.push('Freetext');
					break;
			}
			var caModal = new ConfirmAnnotationModal(output, this);
			caModal.show();
			//this.postNewAnnotation(annotation);
			//alert("Submitted annotation");
		},

		checkAnnotationType : function(e) {
			switch(e.currentTarget.value) {
				case "two":
					$('#itemlist_input').removeAttr('disabled');
					break;
				default:
					$('#itemlist_input').attr('disabled', 'true');
					break;
			}
		},

		postNewAnnotation : function(annotation) {
			console.log("tesgesgvesvs");
			// var payload = annotation.toJSON();
			// delete payload.id;
			// delete payload.values;
// 
			// var result = Gateway.postAnnotation(payload);

			this.clearForm();
		},

		clearForm : function() {
			$('#annotation_name').val("");
			$('#itemlist_input').val("");
		}
	});
	return NewAnnotationView;
});

