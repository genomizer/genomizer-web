define([
	'text!templates/sysadmin/UploadGenomeReleaseModalTemplate.html',
	'views/ModalAC',
	'models/sysadmin/Gateway'
],function(grTemplate,ModalAC,Gateway) {
	var Modal = ModalAC.extend({
		TEMPLATE_VARS: {
			modalTitle: "Upload Genome Release File"
		},
		initialize: function(genomeReleaseFiles, speciesList) {
			this._super();
			this.genomeReleaseFiles = genomeReleaseFiles;
			this.speciesList = speciesList;
			var fileNames = genomeReleaseFiles.getFileNames();
			this.template = _.template(grTemplate, {fileNames : fileNames, speciesList : speciesList});
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
			// var payload = new Backbone.Model();
			// var name = this.genomeReleaseFile.get('fileName');
			// var specie = $('#species_drop-down').val();
			// var genomeVersion = $('#version_field').val();
			// payload.set({"fileName": name,
						 // "specie": specie,
						 // "genomeVersion": genomeVersion});
			//Gateway.postGenomeRelease(payload, this.genomeReleaseFile);
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
			if(($('#version_field').val() != "")){
				 $('#upload_genome_release-btn').removeAttr('disabled');
			} else{
				 $('#upload_genome_release-btn').attr('disabled', '');
			}
		}

	});
	return Modal;
});
