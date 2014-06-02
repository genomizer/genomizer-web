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

			this.subSelection = this.searchResults.isSelectedFilesInExperiment(this.model.cid);

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

			this.searchResults.on("highlightChange", this.highlightChange, this);

			this.model.once("destroy", this.removeRow, this);

			//this.$el.click(this.extendClick);
		},

		render: function() {

			this.$el.empty();

			// render from template
			this.$el.append(this.template({
				'annotations': this.annotations,
				'experiment': this.model,
				'rawCount': this.model.files.where({"type":"Raw"}).length,
				'regionCount': this.model.files.where({"type":"Region"}).length,
				'profileCount': this.model.files.where({"type":"Profile"}).length,
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

			if(this.subSelection) {
				this.$el.addClass("subselection");
			} else {
				this.$el.removeClass("subselection");
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
			"click .title-row td": "extendClick"
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

			/* if files inside this experiment are selected we want to deselect them */
			if(this.subSelection) {

				/* we always want to deselect this experiment along with its files */
				this.$el.find(".experiment-checked-input").prop("checked", false);
				this.model.trigger("experimentSelect", this.model,  false);

				this.$el.removeClass("subselection");
				this.subSelection = false;
				this.rawGroupView.render();
				this.profileGroupView.render();
				this.regionGroupView.render();
			} else {
				this.model.trigger("experimentSelect", this.model,  $(event.currentTarget).prop("checked"));
			}
			
			
		},
		highlightChange: function() {
			this.subSelection = this.searchResults.isSelectedFilesInExperiment(this.model.cid);
			if(this.subSelection) {
				this.$el.addClass("subselection");
			} else {
				this.$el.removeClass("subselection");
			}
		},
		removeRow: function() {
			this.$el.remove();
			this.stopListening();
		},
		extendClick: function(event) {
			if($(event.target).is("td, span, div")) {
				this.$el.find(".expand-experiment-button").click();
			}
		}
	});
	return ExperimentView;

});
