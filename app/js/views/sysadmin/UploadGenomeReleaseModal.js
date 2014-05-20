define([
	'text!templates/sysadmin/UploadGenomeReleaseModalTemplate.html',
	'views/ModalAC',
	'models/sysadmin/Gateway'
],function(grTemplate,ModalAC,Gateway) {
	var Modal = ModalAC.extend({
		TEMPLATE_VARS: {
			modalTitle: "Upload Genome Release File"
		},
		initialize: function(genomeReleaseFile) {
			this._super();
			this.genomeReleaseFile = genomeReleaseFile;
			var fileName = genomeReleaseFile.get('fileName');
			this.template = _.template(grTemplate, {fileName : fileName});
		},
		events: {
			"click #upload_genome_release-btn": "uploadGR",
			"keyup #specie_field" : "changeConfirmAvailability",
			"keyup #version_field" : "changeConfirmAvailability",
			"click #cancel_genome_release-btn" : "cancel"
		},
		render: function() {
			this.$el.html(this.template);	
		},

		uploadGR : function() {
			var payload = new Backbone.Model();
			var name = this.genomeReleaseFile.get('fileName');
			var specie = $('#specie_field').val();
			var genomeVersion = $('#version_field').val();
			payload.set({"fileName": name,
						 "specie": specie,
						 "genomeVersion": genomeVersion});
			Gateway.postGenomeRelease(payload, this.genomeReleaseFile);
			this.hide();
		},
		
		cancel : function() {
			this.hide();
			//this.close();
		},
		
		removeModal: function() {
			this.$modal.remove();

		},
		
		changeConfirmAvailability: function() {
			if(($('#specie_field').val() != "") && ($('#version_field').val() != "")){
				 $('#upload_genome_release-btn').removeAttr('disabled');
			} else{
				 $('#upload_genome_release-btn').attr('disabled', '');
			}
		}
		
	});
	return Modal;
});
