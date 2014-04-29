define([
	'text!views/search/experimentViewTemplate.html'
],function(templateHtml) {
	
	var ExperimentView = Backbone.View.extend({

		template: _.template(templateHtml),

		tagName: 'tbody',

		initialize: function() {
			this.render();

			this.annotations = [{
				"id": 1
			}];
		},

		render: function() {
			this.$el.html(this.template({
				'annotations': this.annotations,
				'experiment': this.model
			}));		
		},
		events: {
			//"click #search_button": "doSearch"
		},
		
	});
	return ExperimentView;

});