define([
	'text!templates/search/fileViewTemplate.html'
],function(templateHtml) {
	
	var FileView = Backbone.View.extend({

		template: _.template(templateHtml),

		tagName: 'tr',
		className: 'file-row',


		initialize: function(options) {
			this.searchResults = options.searchResults;

			this.render();
		},
		render: function() {
			this.$el.html(this.template({
				'file': this.model
			}));
			
			this.$el.find(".file-checked-input").prop("checked", this.searchResults.isFileSelected(this.model.get("id")));
		},
		events: {
			"click .file-checked-input": "fileSelect",
		},
		fileSelect: function(event) {
			this.model.trigger("fileSelect", this.model,  $(event.currentTarget).prop("checked"));
		}

	});
	return FileView;

});