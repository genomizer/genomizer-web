define([
	'text!templates/processModal/Process.html',
	'text!templates/processModal/ProcessAlert.html',
	'text!templates/processModal/ProcessGenomeTemplate.html',
	'views/ModalAC',
	'models/RawToProfileInfo',
	'collections/GenomeReferences'
],function(processTemplate, processAlertTemplate, genomeTemplate, ModalAC, RawToProfileInfo, GenomeReferences) {
	var Modal = ModalAC.extend({
		TEMPLATE: _.template(processTemplate),
		TEMPLATEALERT: _.template(processAlertTemplate),
		TEMPLATEGENOMEOPS: _.template(genomeTemplate),
		TEMPLATE_VARS: {
			modalTitle: "Process raw file"
		},
		initialize: function(options) {
			this._super();
			var queryArray = options.query.split(',');
			this.expID = [];
			// MIGHT NOT WORK WITH EMPTY EXPID!!!!
			this.genomeVersion = queryArray[0];

			this.successes = 0;
			this.failures = 0;
			this.experiments = 0;

			//Don't process multiple experiments with same ID.
			for(var i = 1; i<queryArray.length; i++) {
				var addExp = true;
				for(var j = 1; j<i;j++) {
					if(queryArray[i] == queryArray[j]) {
						addExp = false;
					}
				}
				if(addExp) {
					this.experiments++;
					this.expID.push(queryArray[i]);
				}				
			}

			this.collection = new GenomeReferences({"species":this.genomeVersion});
			this.genomeReferences = this.collection.models;

			var that = this;

			this.genomeRefs = [];

			this.collection.fetch({
				success: function() {

					that.collection.each(function(genomeRef){
						that.genomeRefs.push(genomeRef.get("genomeVersion"));
					});
					that.$el.find('#genome-reference').html(that.TEMPLATEGENOMEOPS({genomes:that.genomeRefs}));
				},
				error: function() {

				}
			});
		},
		events: {
			'submit form':'submitProcess',
			'click #step-box' : 'toggleStepsInput',
			'click [name=process-radios]' : 'radioClicked'
		},
		render: function() {

			this.$el.html(this.TEMPLATE());
			this.$el.find('#genome-reference').html(this.TEMPLATEGENOMEOPS({genomes:this.genomeRefs}));
			this.renderNotices();
			/*this.$el.find('#alert-container').html(this.TEMPLATEALERT({
				'expID': this.expID[0]
			}));

			for(var i = 1; i<this.expID.length;i++) {
				this.$el.find('#alert-container').append(this.TEMPLATEALERT({
					'expID': this.expID[i]
				}));
			}*/
		},
		renderNotices: function() {
			this.$el.find('#alert-container').html(this.TEMPLATEALERT({
				'expID': this.expID[0]
			}));

			for(var i = 1; i<this.expID.length;i++) {
				this.$el.find('#alert-container').append(this.TEMPLATEALERT({
					'expID': this.expID[i]
				}));
			}
		},
		radioClicked: function(e) {
			switch(e.target.id) {
				case "sam":
				case "gff":
				case "sgr":

					$('#raw-process-container input').prop('disabled', false);
					$('#ratio-col input, #smooth-col input, #steps-col input, #ratio-col select').prop('disabled', true);
					$('#ratio-col, #smooth-col, #steps-col').addClass('disabled');

					break;
				case "smooth-radio":

					$('#raw-process-container input').prop('disabled', false);
					$('#ratio-col input, #steps-col input, #ratio-col select').prop('disabled', true);

					$('#raw-process-container .disabled').removeClass('disabled');
					$('#ratio-col, #steps-col').addClass('disabled');

					break;
				case "steps-radio":

					$('#raw-process-container input').prop('disabled', false);
					$('#ratio-col input, #ratio-col select').prop('disabled', true);

					$('#raw-process-container .disabled').removeClass('disabled');
					$('#ratio-col').addClass('disabled');

					break;
				case "ratio-radio":

					$('#raw-process-container input, #raw-process-container select').prop('disabled', false);

					$('#raw-process-container .disabled').removeClass('disabled');

					break;
				default:
					console.log('undefined')
					break;
			}
		},
		submitProcess: function(e) {
			e.preventDefault();
			this.successIDs = [];
			this.failIDs = [];

			var level = $('[name=process-radios]:checked').val();
			var bowtieFlags = ($('#bowtie-params').val());
			var genomeReference = ($('#genome-reference').val());
			var gffFormat = (level >= 2 ? "y": "");
			var sgrFormat = (level >= 3 ? "y": "");
			var smoothParams = (level >= 4 ? (($('#window-size').val()) 
				+ " " + ($('#smooth-type')).val()
				+ " " + ($('#step-pos')).val()
				+ ($('#print-mean').prop('checked') ? " 1": " 0") 
				+ ($('#print-zeros').prop('checked') ? " 1": " 0"))
				: "");
			var steps = (level >= 5 ? "y " + ($('#nr-of-steps').val()): "");
			var ratioCalculation = (level >= 6 ? ($('#ratio-select').val())
				+ " " + ($('#ratio-cut-off').val())
				+ " " + ($('#ratio-chromosomes').val())
				: "");
			var ratioSmoothing = (level >= 6 ? (($('#ratio-window-size').val()) 
				+ " " + ($('#ratio-smooth-type')).val()
				+ " " + ($('#ratio-step-pos')).val()
				+ ($('#ratio-print-mean').prop('checked') ? " 1": " 0") 
				+ ($('#ratio-print-zeros').prop('checked') ? " 1": " 0"))
				: "");
			var genomeVer = ($('#genome-reference').val());

			var parameters = [
				bowtieFlags,
				"",//genomeReference,
				gffFormat,
				sgrFormat,
				smoothParams,
				steps,
				ratioCalculation,
				ratioSmoothing];
				
			for(var i = 0; i<this.expID.length;i++) {
				var data = {
					"expid": this.expID[i],
					"parameters": parameters,
					"metadata": (parameters.join(", ")+", "+genomeReference),
					"genomeVersion": genomeVer,
					"author": "Kalle" //TODO FIX tempvalue
				};

				//Did this into a function to save which file/experiment is run in this loop.
				var f = (function (data, that, experiment) {
					return function() {
						var rawToProfileInfo = new RawToProfileInfo(data);
						console.log('1 file: ',experiment);
						//TELL USER WHICH PROCESSES STARTED AND WAS SUCCESSFULL
						rawToProfileInfo.save({}, {"type":"put", 
							success: function () {
								console.log("successfully sent process request");
								that.handleProcessAnswer(true,experiment);
								//that.hide();
								//app.messenger.success("WOOHOOO!! The processing of raw data "
								//	+ "from the experiment "+ experiment +" has begun!");
							},
							error: function() {
								that.handleProcessAnswer(false,experiment);
								console.log("failed to send process request of raw data from "
									+ "experiment "+experiment);
							}
						});
					};
				})(data, this, this.expID[i]);
				console.log('callling f');
				f.call();
			}
		},
		handleProcessAnswer: function(successfull, exp) {
			if(successfull) {
				this.successes++;
				this.successIDs.push(exp);
			} else {
				this.failures++;
				this.failIDs.push(exp);
			}
			if(this.successes == this.experiments) {
				this.hide();
				app.messenger.success("The processing of raw data from the experimets: "
					+ this.expID.join(', ') + " has begun!");
			} else if(this.successes+this.failures == this.experiments) {
				if(this.successIDs.length>0) {
					app.messenger.warning("The processing of " + this.successIDs.join(', ')
						+ " were successfull. HOWEVER the processing of " + this.failIDs.join(', ') 
						+ " failed, try again.");
				} else {
					app.messenger.warning("The processing of " + this.failIDs.join(', ')  + " failed."
						+ " please try again.");
				}
				for (var i = 0; i<this.successIDs.length; i++) {
					var index = this.expID.indexOf(this.successIDs[i]);
					if (index > -1) {
						this.expID.splice(index, 1);
						this.experiments--;
					}
				}
				this.renderNotices();
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

