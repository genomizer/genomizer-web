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
			this.searchResults = options.searchResults;

			this.expanded = false;

			this.rawGroupView = new FileGroupView({
				collection: this.model.files,
				type: "Raw",
				searchResults: this.searchResults
			});
			this.profileGroupView = new FileGroupView({
				collection: this.model.files,
				type: "Profile",
				searchResults: this.searchResults
			});
			this.regionGroupView = new FileGroupView({
				collection: this.model.files,
				type: "Region",
				searchResults: this.searchResults
			});
		},

		render: function() {

			this.$el.empty();

			// render from template
			this.$el.append(this.template({
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

			if(this.searchResults.isExperimentSelected(this.model.cid)) {
				this.$el.find(".experiment-checked-input").prop("checked", true);
			}

			if(this.expanded) {
				this.$el.addClass("expanded");
			} else {
				this.$el.removeClass("expanded");
			}

			// repair child view event handlers
			this.rawGroupView.delegateEvents();
			this.profileGroupView.delegateEvents();
			this.regionGroupView.delegateEvents();
			
		},
		events: {
			"click .expand-experiment-button": "toggleTypeRows",
			"click .experiment-checked-input": "experimentSelect",
		},
		toggleTypeRows: function(event) {
			if(this.expanded) {
				this.$el.removeClass("expanded");
			} else {
				this.$el.addClass("expanded");
			}

			this.expanded = !this.expanded;
			
		},
		experimentSelect: function(event) {
			this.model.trigger("experimentSelect", this.model,  $(event.currentTarget).prop("checked"));
		}
	});
	return ExperimentView;

});