define([
	'views/search/ExperimentView',
	'text!views/search/headerTemplate.html'
],function(ExperimentView, headerTemplateHtml) {

	var SearchResultsView = Backbone.View.extend({

		tagName: 'table',
		className: 'table',
		headerTemplate: _.template(headerTemplateHtml),

		initialize: function(options) {
			this.experimentViews = [];

			this.annotations = options.annotations;

			// create subviews for each experiment in the given collection
			this.collection.each(function(experiment) {
				this.experimentViews.push(new ExperimentView({
					annotations: this.annotations,
					model : experiment,
				}));
			}, this);

			this.render();
		},
		render: function() {

			// render header template
			this.$el.html(this.headerTemplate({annotations: this.annotations}));

			_.each(this.experimentViews, function(experimentView) {
				
				// render experiment rows
				experimentView.render();

				// append experiment rows to table
				this.$el.append(experimentView.$el);
			}, this);

			
		},
		events: {
			//"click #search_button": "doSearch"
			
		},
		
	});
	return SearchResultsView;
});
