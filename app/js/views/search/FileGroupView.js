define([
	"text!templates/search/fileHeaderTemplate.html",
	"text!templates/search/typeExpandRowTemplate.html",
	"views/search/FileView",
	"collections/Files"
],function(headerTemplateHtml, typeRowTemplateHtml, FileView, Files) {
	
	var ExperimentView = Backbone.View.extend({

		typeRowTemplate: _.template(typeRowTemplateHtml),
		headerTemplate: _.template(headerTemplateHtml),

		tagName: 'tbody',
		className: 'file-group',


		initialize: function(options) {
			this.type = options.type;
			this.searchResults = options.searchResults;

			this.updateSubCollection();
			this.collection.on("sync remove", this.updateSubCollection, this);

			this.expanded = false;

			this.$el.addClass(this.type + "-group");

			this.render();
		},

		render: function() {
			this.$el.empty();

			// render from template
			this.$el.append(this.typeRowTemplate({
				type: this.type,
				colspan: this.colspan
			}));

			if(this.subCollection.length > 0) {
				this.$el.append(this.headerTemplate());
			} else {
				this.$el.addClass("empty-group")
			}

			if(this.expanded && this.subCollection.length > 0) {
				this.$el.addClass("expanded");
			} else {
				this.$el.removeClass("expanded");
			}
			

			// create and render individual file views
			this.subCollection.each(function(file) {
				var fileView = new FileView({
					model: file,
					searchResults: this.searchResults
				});

				fileView.render();
				this.$el.append(fileView.$el);
			}, this);
		},
		events: {
			"click .expand-type-button": "toggleFileRows",
			"click .expand-type-row td": "extendClick"
		},
		toggleFileRows: function(event) {
			if(this.subCollection.length > 0) {
				if(this.expanded) {
					this.$el.removeClass("expanded");
				} else {
					this.$el.addClass("expanded");
				}

				this.expanded = !this.expanded;
			}
			
		},
		updateSubCollection: function() {
			this.subCollection = new Files(this.collection.where({type: this.type}));
			this.render();
		},
		extendClick: function(event) {
			if($(event.target).is("td, span")) {
				this.$el.find(".expand-type-button").click();
			}
		}
		
	});
	return ExperimentView;

});
