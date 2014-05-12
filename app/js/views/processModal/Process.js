define([
	'text!templates/processModal/Process.html',
	'views/ModalAC'
],function(processTemplate,ModalAC) {
	var Modal = ModalAC.extend({
		TEMPLATE: _.template(processTemplate),
		TEMPLATE_VARS: {
			modalTitle: "Process raw file"
		},
		initialize: function(options) {
			this._super();
			this.fileName = options.query.split(',')[0];
			this.fileID = options.query.split(',')[1];
			this.expID = options.query.split(',')[2];
		},
		events: {
			'submit form':'submitProcess',
			'click #step-box' : 'toggleStepsInput'
		},
		render: function() {
			this.$el.html(this.TEMPLATE());	
		},
		submitProcess: function(e) {
			e.preventDefault();
			if($('#nr-of-steps').prop('disabled') == false && $('#nr-of-steps').val() < 0) {
//				console.log('negative number!!!!! :(');
				//TODO do not send form.
			}else {
				var bowtieFlags = ($('#bowtie-params').val());
				var genomeFilePath = ($('#genomePath').val());
				var smoothParams = ($('#window-size').val()) 
					+ " " + ($('#smooth-type')).val()
					+ " " + ($('#step-pos')).val()
					+ ($('#print-mean').prop('checked') ? " 1": " 0");
				smoothParams += ($('#print-zeros').prop('checked') ? " 1": " 0");
				var createStep;

				if($('#step-box').prop('checked')) {
					createStep = "y ";
					if($('#nr-of-steps').val().length > 0) {
						createStep += $('#nr-of-steps').val();
					} else {
						createStep += "10";
					}
				} else {
					createStep = "n 0";
				}
/*				console.log('bowtieFlags: ',bowtieFlags);
				console.log('genomeFilePath: ',genomeFilePath);
				console.log('smoothParams: ',smoothParams);
				console.log('createStep: ',createStep);
*/

			}
			alert("Not yet implemented!");
		},
		toggleStepsInput: function() {
			if ($('#step-box').prop('checked')) {
				$('#nr-of-steps').prop('disabled', false);
			} else {
				$('#nr-of-steps').val('');
				$('#nr-of-steps').prop('disabled', true);
			}

		}
	});
	return Modal;
});
