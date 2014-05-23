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

			this.updateSubCollection();
			this.collection.on("sync", this.updateSubCollection, this);

			this.render();
		},

		render: function() {

			// render from template
			this.$el.html(this.typeRowTemplate({
				type: this.type,
				colspan: this.colspan
			}));

			if(this.subCollection.length > 0) {
				this.$el.append(this.headerTemplate());
			} else {
				this.$el.addClass("empty-group")
			}
			

			// create and render individual file views
			this.subCollection.each(function(file) {
				var fileView = new FileView({
					model : file
				});

				fileView.render();
				this.$el.append(fileView.$el);
			}, this);
		},
		events: {
			"click .expand-type-button": "toggleFileRows",
		},
		toggleFileRows: function(event) {
			if(this.subCollection.length > 0) {
				$(event.delegateTarget).toggleClass("expanded");
			}
			
		},
		updateSubCollection: function() {
			this.subCollection = new Files(this.collection.where({type: this.type}));
		}
		
	});
	return ExperimentView;

});