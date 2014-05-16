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
			this.fileName = [];
			// MIGHT NOT WORK WITH EMPTY EXPID!!!!
			this.genomeVersion = queryArray[0];


			for(var i = 1; i<queryArray.length; i++) {
				this.expID.push(queryArray[i]);
				this.fileName.push(queryArray[++i]);
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



//			console.log(this.collection.species);
//			this.collection.fetch();
//			console.log("here");
			/*this.expID = options.query.split(',')[0];
			this.fileName = options.query.split(',')[1];*/
			//this.fileID = options.query.split(',')[2];
		},
		events: {
			'submit form':'submitProcess',
			'click #step-box' : 'toggleStepsInput',
			'click [name=process-radios]' : 'radioClicked'
		},
		render: function() {

			this.$el.html(this.TEMPLATE());
			this.$el.find('#genome-reference').html(this.TEMPLATEGENOMEOPS({genomes:this.genomeRefs}));
			this.$el.find('#alert-container').html(this.TEMPLATEALERT({
				'fileName': this.fileName[0],
				'expID': this.expID[0]
			}));
			for(var i = 1; i<this.expID.length;i++) {
				this.$el.find('#alert-container').append(this.TEMPLATEALERT({
					'fileName': this.fileName[i],
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

			var level = $('[name=process-radios]:checked').val();
			var bowtieFlags = ($('#bowtie-params').val());
			var genomeReference = ($('#genome-reference').val());
			var gffFormat = (level == 2 ? "y": "");
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
					//"filename": this.fileName,
					//"fileId": this.fileID,
					"expid": this.expID[i],
					"parameters": parameters,
					"metadata": (parameters.join(", ")+", "+genomeReference),
					"genomeVersion": genomeVer, //TODO FIX tempvalue
					"author": "Kalle" //TODO FIX tempvalue
				};
	 
	 			var rawToProfileInfo = new RawToProfileInfo(data);
	 			var that = this;
	 			var file = this.fileName[i];
	 			//TELL USER WHICH PROCESSES STARTED AND WAS SUCCESSFULL
	 			rawToProfileInfo.save({}, {"type":"put", 
					success: function () {
						console.log("successfully sent process request");
						that.hide();
						app.messenger.success("WOOHOOO!! The processing of "+ file +" has begun!");
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

