define([
	"text!templates/search/fileGroupHeaderTemplate.html",
	"views/search/FileView"
],function(templateHtml, FileView) {
	
	var ExperimentView = Backbone.View.extend({

		template: _.template(templateHtml),

		tagName: 'tbody',
		className: 'file-group',


		initialize: function(options) {
			this.fileType = options.fileType;	
		},

		render: function() {

			// render from template
			this.$el.html(this.template({
				'fileType': this.fileType,
			}));

			// create and render individual file views
			this.model.files.each(function(file) {
				var fileView = new FileView({
					model : file
				});

				fileView.render();
				this.$el.append(fileView.$el);
			}, this);
		},
		events: {
			"click .expand-file-button": "toggleFileRows",
		},
		toggleFileRows: function(event) {
			$(event.delegateTarget).toggleClass($(event.currentTarget).data("filetype") + "-expanded");
		},
		
	});
	return ExperimentView;

});