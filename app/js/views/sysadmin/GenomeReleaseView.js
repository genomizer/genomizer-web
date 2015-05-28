/**
 * A view class displaying the Genome-Release page
 */
define(['text!templates/sysadmin/GenomeReleaseTemplate.html', 
		'collections/sysadmin/GenomeReleaseFiles', 
		'models/sysadmin/GenomeReleaseFile', 
		'views/sysadmin/UploadGenomeReleaseModal', 
		'models/sysadmin/Gateway', 
		'collections/sysadmin/Annotations'],
function(GenomeReleaseTemplate, GenomeReleaseFiles, GenomeReleaseFile, UploadGenomeReleaseModal, Gateway, Annotations) {
	var GenomeReleaseView = Backbone.View.extend({
		initialize : function() {
			this.genomeReleaseFileList = new GenomeReleaseFiles();
			this.genomeReleaseFiles = new GenomeReleaseFiles();
			this.fetchGenomeRelease();
			this.genomeReleaseFileList.on("uploadProgress", this.renderUploadProgress, this);
		},
		
		/**
		 * Fetches genome releases from server and renders the view 
		 */
		fetchGenomeRelease : function() {
			var that = this;
			this.genomeReleaseFiles.fetch({
				complete : function() {
					that.render(that.genomeReleaseFiles);
				}
			});
		},

		render : function(genomeReleaseFiles) {
			var template = _.template(GenomeReleaseTemplate, {
				genomeReleaseFiles : genomeReleaseFiles.models
			});
			$('.activePage').html(template);
			this.renderUploadProgress();

			this.$el.find("#annotation").removeClass("activeLink");
			this.$el.find("#genomeReleases").addClass("activeLink");
		},

		events : {
			"click #th_species" : "orderBySpecies",
			"click #th_version" : "orderByVersion",
			"click .delete_genome_btn" : "deleteGenomeRelease",
			"change .fileInput" : "addSelectedFile",
			"click #choose_files" : "setSpecies"
		},

		/**
		 * Calls the collection and asks it to re-order after "Species"
		 */
		orderBySpecies : function() {
			this.genomeReleaseFiles.orderBy("species");
			this.render(this.genomeReleaseFiles);
		},

		/**
		 * Calls the collection and asks it to re-order after "genomeVersion"
		 */
		orderByVersion : function() {
			this.genomeReleaseFiles.orderBy("genomeVersion");
			this.render(this.genomeReleaseFiles);
		},

		/**
		 * Calls the Gateway to send delete packet containing the genome release
		 * information
		 */
		deleteGenomeRelease : function(e) {
			var payload = e.currentTarget.id.split(",");
			var x = window.confirm("Are you sure you want to delete version " + payload[1] + " of " + payload[0] + "?");
			if (x) {
				Gateway.deleteGenomeReleaseFile(payload[0], payload[1]);
				this.fetchGenomeRelease();
			}
		},

		/**
		 * Used by the Select Files to Upload button. Collects the files and
		 * sends them to a new UploadGenomeReleaseModal for user confirmation
		 */
		addSelectedFile : function() {
			var formFiles = this.$el.find(".fileInput")[0].files;
			this.genomeReleaseFileList.addFilesByFileObject(formFiles);
			var uploadGenomeReleaseModal = new UploadGenomeReleaseModal(this.genomeReleaseFileList, this.speciesList);
			uploadGenomeReleaseModal.show();
		},

		/**
		 * Gets the user inputed species values from annotations and adds
		 * that to a speciesList
		 */
		setSpecies : function() {
			$('.fileInput').val('');
			this.genomeReleaseFileList.reset();
			var annotations = new Annotations();
			that = this;
			annotations.fetch({
				success : function(annotations) {
					that.speciesList = annotations.getValuesOf("Species");
				}
			});
		},

		renderUploadProgress : function() {
			if (this.genomeReleaseFileList.hasUnfinishedUploads() && this.genomeReleaseFileList.length) {
				$('#progress-bar-container').replaceWith("<div id=" + "progress-bar-container" + "><div class=" + "progress" + "><div class=" + "progress-bar" + " id=" + "pbar" + " style=width:" + this.genomeReleaseFileList.getTotalUploadProgress() * 100 + "%;></div></div></div>");
			} else if (this.genomeReleaseFileList.length != 0) {
				$('#progress-bar-container').replaceWith("<div id=" + "progress-bar-container>" + "<div class=" + "progress" + "><div class=" + "progress-bar" + " id=" + "pbar" + " style=width:" + 100 + "%;>Upload completed</div></div></div>");
			}
		}
	});
	return GenomeReleaseView;
});
