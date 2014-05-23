define([
	'text!templates/search/experimentViewTemplate.html',
	"text!templates/search/fileHeaderTemplate.html",
	"views/search/FileGroupView"
],function(templateHtml, fileHeaderTemplateHtml, FileGroupView) {
	
	var ExperimentView = Backbone.View.extend({

		template: _.template(templateHtml),

		tagName: 'tbody',
		className: 'experiment-group',


		initialize: function(options) {
			this.annotations = options.annotations;

			this.rawGroupView = new FileGroupView({
				collection: this.model.files,
				type: "Raw"
			});
			this.profileGroupView = new FileGroupView({
				collection: this.model.files,
				type: "Profile"
			});
			this.regionGroupView = new FileGroupView({
				collection: this.model.files,
				type: "Region"
			});
		},

		render: function() {

			// render from template
			this.$el.html(this.template({
				'annotations': this.annotations,
				'experiment': this.model
			}));

			// render file headers from template
			this.$el.find(".table-row thead").html(fileHeaderTemplateHtml);

			// append groups
			var table = this.$el.find("table");
			table.append(this.rawGroupView.$el);
			table.append(this.profileGroupView.$el);
			table.append(this.regionGroupView.$el);
		},
		events: {
			"click .expand-experiment-button": "toggleTypeRows",
			"click .checked-input": "fileSelect",
		},
		toggleTypeRows: function(event) {
			$(event.delegateTarget).toggleClass("expanded");
		},
		fileSelect: function(event) {
			var fileID = $(event.currentTarget).closest("tr").data("id");
			this.model.trigger("fileSelect", this.model, fileID,  $(event.currentTarget).prop("checked"));
			//event.preventDefault();
		}
		
	});
	return ExperimentView;

});