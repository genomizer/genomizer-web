define([
	'text!views/search/fileViewTemplate.html'
],function(templateHtml) {
	
	var FileView = Backbone.View.extend({

		template: _.template(templateHtml),

		tagName: 'tr',
		className: 'file-row',


		initialize: function(options) {
			this.render();
		},

		render: function() {
			this.$el.html(this.template({
				'file': this.model
			}));

			//this.$el.addClass(this.model.get("type") + "-file-row");
			this.$el.data("id", this.model.get("id"));
			this.$el.data("url", this.model.get("url"));
		}
	});
	return FileView;

});