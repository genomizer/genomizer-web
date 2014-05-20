define([
	'models/File',
	'text!templates/upload/FileUploadView.html',
	'text!templates/upload/FileUploadViewExisting.html'
],
function(File,FileUploadTemplate,FileUploadTemplateExisting) {
	var FileUploadView = Backbone.View.extend({
		TEMPLATE: _.template(FileUploadTemplate),
		EXISTING_TEMPLATE: _.template(FileUploadTemplateExisting),
		initialize: function() {
			this.model.on("uploadProgress",this.renderProgress,this);
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
						fileSize:this.model.getReadableFileSize(),
						genomeReleases:this.getGenomeRealeases()
					}
				)));
			} else {
				this.$el.html(this.EXISTING_TEMPLATE(_.extend(
					this.model.toJSON()
				)));
			}
			this.updateModel();
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
		updateModel:function() {
			var input = {};
			this.$("input, select").each(function() {
				var $this = $(this);
				input[$this.attr("name")] = $this.val();
			});
			this.model.set(input);
		}
	});
	return FileUploadView;
});


