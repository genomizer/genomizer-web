/**
 * A view class for the Create Annotation view where the user enters information
 * about the new annotation
 */
define(['text!templates/sysadmin/NewAnnotationTemplate.html', 
		'models/sysadmin/Annotation', 
		'models/sysadmin/Gateway', 
		'views/sysadmin/ConfirmAnnotationModal'], 
function(newAnnotationTemplate, Annotation, Gateway, ConfirmAnnotationModal) {
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

		/**
		 * Submits the new annotation
		 */
		submit : function() {
			// Base case
			if ($('#annotation_name').val() === "") {
				alert("Some required fields are empty");
				return;
			}

			var output = [];
			// Used for showing information in modal
			this.annotation = new Annotation();
			this.annotation.set({
				"name" : $('#annotation_name').val()
			});
			output.push($('#annotation_name').val());

			// Check forced value
			switch($('#annotation_forced').val()) {
				case "yes":
					this.annotation.set({
						"forced" : true
					});
					output.push('Yes');
					break;
				case "no":
					this.annotation.set({
						"forced" : false
					});
					output.push('No');
					break;
			}

			// Check annotation type value
			switch($('#annotation_type').val()) {
				case "yes_no_unknown":
					this.annotation.set({
						"type" : ["Yes", "No", "Unknown"],
						"default" : "Unknown"
					});
					output.push('Yes/No/Unknown');
					break;
				case "drop-down_list":
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
						"default" : "Unknown"
					});
					output.push('Freetext');
					break;
			}
			var caModal = new ConfirmAnnotationModal(output, this);
			caModal.show();
		},

		/**
		 * Checks which annotation type is chosen and disables/enables input
		 * @param {Object} e
		 */
		checkAnnotationType : function(e) {
			switch(e.currentTarget.value) {
				case "drop-down_list":
					$('#itemlist_input').removeAttr('disabled');
					break;
				default:
					$('#itemlist_input').attr('disabled', 'true');
					break;
			}
		},

		/**
		 * Posts new annotation through gateway
		 */
		postNewAnnotation : function() {
			var payload = this.annotation.toJSON();
			delete payload.id;
			delete payload.values;
			var result = Gateway.postAnnotation(payload);

			this.clearForm();
		},

		/**
		 * Clears the input form
		 */
		clearForm : function() {
			$('#annotation_name').val("");
			$('#itemlist_input').val("");
		}
	});
	return NewAnnotationView;
});

