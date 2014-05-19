define(['text!templates/sysadmin/GenomeReleaseTemplate.html', 'collections/sysadmin/GenomeReleaseFiles', 'models/sysadmin/GenomeReleaseFile', 'views/sysadmin/UploadGenomeReleaseModal'], function(GenomeReleaseTemplate, GenomeReleaseFiles, GenomeReleaseFile, UploadGenomeReleaseModal) {
	var GenomeReleaseView = Backbone.View.extend({
		initialize : function() {
			//this.genomeReleaseFiles = new GenomeReleaseFiles( { "genomeVersion": "hy17", "specie": "fly", "path": "pathToFile", "fileName": "nameOfFile" });
			var that = this;

			this.genomeReleaseFiles = new GenomeReleaseFiles();
			// this.genomeReleaseFiles = new GenomeReleaseFiles(file1);
			// this.genomeReleaseFiles.push(file2);
			this.genomeReleaseFiles.fetch({
				complete : function() {
					console.log(that.genomeReleaseFiles);
					that.render(that.genomeReleaseFiles);
				}
			}); 

			// console.log(this.genomeReleaseFiles);
			// this.render(this.genomeReleaseFiles);
		},

		render : function(genomeReleaseFiles) {
			console.log(genomeReleaseFiles);
			var template = _.template(GenomeReleaseTemplate, {genomeReleaseFiles : genomeReleaseFiles.models});
			$('.activePage').html(template);

		},
		
		events : {
			"click #th_species": "sortBySpecies",
			"click #th_version": "sortByVersion",
			"click #th_filename": "sortByFileName",
			"click #delete_genome_btn" : "deleteGenomeRelease",
			"change .fileInput": "addSelectedFile"
			
		},
		
		sortBySpecies : function() {
			this.genomeReleaseFiles.sortBy("specie");
		},
		
		sortByVersion : function() {
			this.genomeReleaseFiles.sortBy("genomeVersion");
		},
		
		sortByFileName : function() {
			this.genomeReleaseFiles.sortBy("fileName");
		},
		
		deleteGenomeRelease : function(e) {
			console.log(e);
			console.log($('#delete_genome_btn').find('value'));
		},
		
		addSelectedFile: function() {
			var formFiles = this.$el.find(".fileInput")[0].files;
			var fileObj = formFiles[0];
			var genomeReleaseFile = new GenomeReleaseFile();
			genomeReleaseFile.setFileObj(fileObj);
			genomeReleaseFile.set({"fileName": fileObj.name});
			var uploadGenomeReleaseModal = new UploadGenomeReleaseModal(genomeReleaseFile);
			uploadGenomeReleaseModal.show();
			this.$el.find(".fileInput").val("");

		}
	
	});
	return GenomeReleaseView;
});
