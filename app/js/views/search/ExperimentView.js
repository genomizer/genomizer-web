define([
	'text!templates/search/experimentViewTemplate.html',
	"text!templates/search/fileHeaderTemplate.html",
	"views/search/FileView"
],function(templateHtml, fileHeaderTemplateHtml, FileView) {
	
	var ExperimentView = Backbone.View.extend({

		template: _.template(templateHtml),

		tagName: 'tbody',
		className: 'experiment-group',


		initialize: function(options) {
			this.annotations = options.annotations;
			this.render();
		},

		render: function() {

			// render from template
			this.$el.html(this.template({
				'annotations': this.annotations,
				'experiment': this.model
			}));

			// render file headers from template
			this.$el.find(".table-row thead").html(fileHeaderTemplateHtml);

			// create and render experiment views
			this.model.files.each(function(file) {
				var fileView = new FileView({
					model : file
				});

				fileView.render();
				console.log("ExperimentView > render > filetype: ", file.get("type"))
				this.$el.find(".js-" + file.get("type") + "-container").append(fileView.$el);
			}, this);
		},
		events: {
			"click .expand-experiment-button": "toggleTypeRows",
			"click .expand-file-button": "toggleFileRows",
			"click .checked-input": "fileSelect",
		},
		toggleTypeRows: function(event) {
			$(event.delegateTarget).toggleClass("expanded");
		},
		toggleFileRows: function(event) {
			$(event.delegateTarget).toggleClass($(event.currentTarget).data("filetype") + "-expanded");
		},
		fileSelect: function(event) {
			var fileID = $(event.currentTarget).closest("tr").data("id");
			this.model.trigger("fileSelect", this.model, fileID,  $(event.currentTarget).prop("checked"));
			//event.preventDefault();
		}
		
	});
	return ExperimentView;

});