define([
	'text!views/search/experimentViewTemplate.html'
],function(templateHtml) {
	
	var ExperimentView = Backbone.View.extend({

		template: _.template(templateHtml),

		tagName: 'tbody',
		className: 'experiment-group',


		initialize: function(options) {
			this.annotations = options.annotations;

			this.render();
		},

		render: function() {
			this.$el.html(this.template({
				'annotations': this.annotations,
				'experiment': this.model
			}));
		},
		events: {
			"click .expand-experiment-button": "toggleTypeRows"
		},
		toggleTypeRows: function(event) {
			$(event.delegateTarget).toggleClass("expanded");
		}
		
	});
	return ExperimentView;

});