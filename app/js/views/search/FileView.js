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
			"click td": "extendClick",
            "click #edit_file": "editFile"
		},
		fileSelect: function(event) {
			var checked = $(event.currentTarget).prop("checked");
			this.model.trigger("fileSelect", this.model,  checked);
			if(checked) {
				this.$el.addClass("selected");
			} else {
				this.$el.removeClass("selected");
			}
		},
		extendClick: function(event) {
			if($(event.target).is("td, span")) {
				this.$el.find(".file-checked-input").click();
			}
		},

        editFile: function() {
            alert("edit file");
        }

	});
	return FileView;

});
