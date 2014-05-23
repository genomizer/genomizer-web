define(['text!templates/sysadmin/GenomeReleaseTemplate.html', 
		'collections/sysadmin/GenomeReleaseFiles', 
		'models/sysadmin/GenomeReleaseFile', 
		'views/sysadmin/UploadGenomeReleaseModal',
		'models/sysadmin/Gateway',
		'collections/sysadmin/Annotations'
], function(GenomeReleaseTemplate, GenomeReleaseFiles, GenomeReleaseFile, UploadGenomeReleaseModal, Gateway, Annotations) {
	var GenomeReleaseView = Backbone.View.extend({
		initialize : function() {
			var that = this;
			this.genomeReleaseFileList = new GenomeReleaseFiles();
			this.genomeReleaseFiles = new GenomeReleaseFiles();
			this.genomeReleaseFiles.fetch({
				complete : function() {
					that.render(that.genomeReleaseFiles);
				}
			}); 
		},

		render : function(genomeReleaseFiles) {
			var template = _.template(GenomeReleaseTemplate, {genomeReleaseFiles : genomeReleaseFiles.models});
			$('.activePage').html(template);
			this.renderUploadProgress();
		},
		
		events : {
			"click #th_species": "orderBySpecies",
			"click #th_version": "orderByVersion",
			"click .delete_genome_btn" : "deleteGenomeRelease",
			"change .fileInput": "addSelectedFile",
			"click #choose_files" : "setSpecies"
			
		},
		
		orderBySpecies : function() {
			this.genomeReleaseFiles.orderBy("specie");
			this.render(this.genomeReleaseFiles);
		},
		
		orderByVersion : function() {
			this.genomeReleaseFiles.orderBy("genomeVersion");
			this.render(this.genomeReleaseFiles);
		},
		
		deleteGenomeRelease : function(e) {
			var payload = e.currentTarget.id.split(",");
			Gateway.deleteGenomeReleaseFile(payload[0], payload[1]);
		},
		
		addSelectedFile: function() {
			var formFiles = this.$el.find(".fileInput")[0].files;
			this.genomeReleaseFileList.addFilesByFileObject(formFiles);
			var uploadGenomeReleaseModal = new UploadGenomeReleaseModal(this.genomeReleaseFileList, this.speciesList);
			uploadGenomeReleaseModal.show();
		},
				
		setSpecies : function(){
			this.genomeReleaseFileList.reset();
			var annotations = new Annotations();
			that = this;
            annotations.fetch({
                success : function(annotations) {
                    that.speciesList = annotations.getValuesOf("Species");
                }
            });
		},
		
		renderUploadProgress: function() {
			// if(!this.genomeReleaseFiles.hasUnfinishedUploads() && genomeReleaseFiles.length) {
// 				
			// } else {
				//var progress = this.genomeReleaseFiles.getTotalUploadProgress() * 100;
				// var prog = 0;
				// for(var i=0; i < 1000000000; i++){
					// if(i%10000000==0){
						// prog++;
						// console.log(prog);
						// $("#pbar").css('width',prog+'%');
						// console.log($('#pbar').val());
					// }
				// }
				//$('.progess-bar').width(progress);
			// }
		},
	
	});
	return GenomeReleaseView;
});
