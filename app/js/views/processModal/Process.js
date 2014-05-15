define([
	'text!templates/processModal/Process.html',
	'views/ModalAC',
	'models/RawToProfileInfo'
],function(processTemplate,ModalAC, RawToProfileInfo) {
	var Modal = ModalAC.extend({
		TEMPLATE: _.template(processTemplate),
		TEMPLATE_VARS: {
			modalTitle: "Process raw file"
		},
		initialize: function(options) {
			this._super();
//			$('#window-size').val(10);
//			$('#smooth-type').val(1);
//			$('#step-pos').val(5);
			this.fileName = options.query.split(',')[0];
			this.fileID = options.query.split(',')[1];
			this.expID = options.query.split(',')[2];
			$('#ratio-smoothing input').prop("disabled",true);
		},
		events: {
			'submit form':'submitProcess',
			'click #step-box' : 'toggleStepsInput',
			'click [name=process-radios]' : 'radioClicked'
		},
		render: function() {
			this.$el.html(this.TEMPLATE());	
		},
		radioClicked: function(e) {
			switch(e.target.id) {
				case "sam":
				case "gff":
				case "sgr":
					$('#raw-process-container input').prop('disabled', false);
					$('#ratio-col input, #smooth-col input, #steps-col input, #ratio-col select').prop('disabled', true);
				break;
				case "smooth-radio":
					$('#raw-process-container input').prop('disabled', false);
					$('#ratio-col input, #steps-col input, #ratio-col select').prop('disabled', true);
				break;
				case "steps-radio":
					$('#raw-process-container input').prop('disabled', false);
					$('#ratio-col input, #ratio-col select').prop('disabled', true);
				break;
				case "ratio-radio":
					$('#raw-process-container input, #raw-process-container select').prop('disabled', false);
				break;
				default:
					console.log('undefined')
				break;
			}
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
				var data = 	{
							"filename": this.fileName,
							"fileId": this.fileID,
							"expid": this.expID,
							"processtype": "rawtoprofile",
							"parameters": [
											bowtieFlags,
											genomeFilePath,
											"y",
											"y",
											smoothParams,
											createStep,
											"single 4 0",
											"150 1 7 0 0"
										  ],
							"metadata": bowtieFlags + ", " + genomeFilePath + ", " + smoothParams + ", " + createStep,
							"genomeRelease": "hg38",
							"author": "Kalle"							
							}

				var rawToProfileInfo = new RawToProfileInfo(data);
				var that = this;
				rawToProfileInfo.save({}, {"type":"put", 
					success: function () {
						console.log("successfully sent process request");
						that.hide();
					},
					error: function() {
						console.log("failed to send process request");
					}
					});
			}
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



