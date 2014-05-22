define(['text!templates/sysadmin/GenomeReleaseTemplate.html', 
		'collections/sysadmin/GenomeReleaseFiles', 
		'models/sysadmin/GenomeReleaseFile', 
		'views/sysadmin/UploadGenomeReleaseModal',
		'models/sysadmin/Gateway',
		'collections/sysadmin/Annotations'
], function(GenomeReleaseTemplate, GenomeReleaseFiles, GenomeReleaseFile, UploadGenomeReleaseModal, Gateway, Annotations) {
	var GenomeReleaseView = Backbone.View.extend({
		initialize : function() {
			//this.genomeReleaseFiles = new GenomeReleaseFiles( { "genomeVersion": "hy17", "specie": "fly", "path": "pathToFile", "fileName": "nameOfFile" });
			var that = this;
			this.genomeReleaseFileList = new GenomeReleaseFiles();
			this.genomeReleaseFiles = new GenomeReleaseFiles();
			// this.genomeReleaseFiles = new GenomeReleaseFiles(file1);
			// this.genomeReleaseFiles.push(file2);
			this.genomeReleaseFiles.fetch({
				complete : function() {
					that.render(that.genomeReleaseFiles);
				}
			}); 
			// console.log(this.genomeReleaseFiles);
			// this.render(this.genomeReleaseFiles);
		},

		render : function(genomeReleaseFiles) {
			
			var template = _.template(GenomeReleaseTemplate, {genomeReleaseFiles : genomeReleaseFiles.models});
			$('.activePage').html(template);

		},
		
		events : {
			"click #th_species": "orderBySpecies",
			"click #th_version": "orderByVersion",
			"click #th_filename": "orderByFileName",
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
		
		orderByFileName : function() {
			this.genomeReleaseFiles.orderBy("fileName");
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
		}
	
	});
	return GenomeReleaseView;
});
