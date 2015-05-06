define([
	'models/File',
	'text!templates/upload/FileUploadView.html',
	'text!templates/upload/FileUploadViewExisting.html'
],
function(File,FileUploadTemplate,FileUploadTemplateExisting) {
	var FileUploadView = Backbone.View.extend({
		TEMPLATE: _.template(FileUploadTemplate),
		EXISTING_TEMPLATE: _.template(FileUploadTemplateExisting),
		GN_TEMPLATE: _.template('<% _.each(genomeReleases,function(genomeRelease) { %><option value="<%- genomeRelease %>" ><%- genomeRelease %></option><% }); %>'),
		initialize: function() {
			this.model.on("uploadProgress",this.renderProgress,this);
			this.model.on("change:type",this.toggleGenomeReleaseDropdown,this);
			this.model.collection.experiment.on("change:annotations",this.renderGenomeReleases,this);
		},
		tagName:'li',
		className:'list-group-item',
		events: {
			'change select': 'updateModel',
			'change input': 'updateModel',
			'click .btn-remove': 'removeFileFunction' 
		},
		render: function() {
			if (this.model.isFileUpload()) {
				this.$el.html(this.TEMPLATE(_.extend(
					this.model.toJSON(), {
						fileSize:this.model.getReadableFileSize()
					}
				)));
				this.renderGenomeReleases();
			} else {
				this.$el.html(this.EXISTING_TEMPLATE(_.extend(
					this.model.toJSON()
				)));
			}
			this.updateModel();
			this.toggleGenomeReleaseDropdown();
		},
		changeSelect: function() {
			this.model.set("type",this.$("select").val());
		},
		removeFileFunction: function() {
			this.el.remove();
			this.model.collection.remove(this.model);
		},
		getGenomeRealeases: function() {
			var genRel = this.model.collection.experiment.getPossibleGenomeReleases();
			return genRel.map(function(g) {
				return g.get("genomeVersion");
			});
		},
		renderGenomeReleases:function() {
			var newSpecies = this.model.collection.experiment.getAnnotation("Species").value;
			if(newSpecies != this.currentSpecies) {
				this.$(".gr-version").html(this.GN_TEMPLATE({
					genomeReleases:this.getGenomeRealeases()
				}));
				this.currentSpecies = newSpecies;
			}
		},
		updateModel:function() {
			var input = {};
			this.$("input, select").each(function() {
				var $this = $(this);
				input[$this.attr("name")] = $this.val();
			});
			this.model.set(input);
		},
		toggleGenomeReleaseDropdown: function() {
			this.$(".gr-version").toggle(this.model.get('type').toLowerCase() != "raw");
		}
	});
	return FileUploadView;
});


