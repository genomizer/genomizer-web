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
			"click #createNewAnnotation" : "submit",
			"change #annotation_type" : "checkAnnotationType"
		},

		submit : function() {
			if ($('#annotation_name').val() === "") {
				alert("Some required fields are empty");
				return;
			}

			var output = [];
			this.annotation = new Annotation();
			this.annotation.set({
				"name" : $('#annotation_name').val()
			});
			output.push($('#annotation_name').val()); 
			console.log(output[0]);

			switch($('#annotation_forced').val()) {
				case "one":
					this.annotation.set({
						"forced" : "true"
					});
					output.push('Yes');
					break;
				case "two":
					this.annotation.set({
						"forced" : "false"
					});
					output.push('No');
					break;
			}

			switch($('#annotation_type').val()) {
				case "one":
					this.annotation.set({
						"type" : ["yes", "no"],
						"default" : "yes"
					});
					output.push('Yes/No');
					break;
				case "two":
					var temp = $('#itemlist_input').val();
					temp = temp.split(",");
					this.annotation.set({
						"type" : temp,
						"default" : temp[0]
					});
					output.push('Drop-down list');
					output.push(temp);
					break;
				default:
					this.annotation.set({
						"type" : ["freetext"],
						"default" : ""
					});
					output.push('Freetext');
					break;
			}
			var caModal = new ConfirmAnnotationModal(output, this);
			caModal.show();
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

		postNewAnnotation : function() {
			var payload = this.annotation.toJSON();
			delete payload.id;
			delete payload.values;
			var result = Gateway.postAnnotation(payload);

			this.clearForm();
		},

		clearForm : function() {
			$('#annotation_name').val("");
			$('#itemlist_input').val("");
		}
	});
	return NewAnnotationView;
});

