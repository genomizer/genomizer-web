define([
	'views/search/ExperimentView',
	'text!views/search/headerTemplate.html'
],function(ExperimentView, headerTemplateHtml) {

	var SearchResultsView = Backbone.View.extend({

		tagName: 'table',
		headerTemplate: _.template(headerTemplateHtml),

		initialize: function() {
			this.experimentViews = [];

			this.collection.each(function(experiment) {
				this.experimentViews.push(new ExperimentView({
					model : experiment,
				}));
			}, this);

			this.render();
		},
		render: function() {
			this.$el.html(this.headerTemplate());
			_.each(this.experimentViews, function(experimentView) {
				xperimentView.render();
			});
		},
		events: {
			//"click #search_button": "doSearch"
			
		},
		
	});
	return SearchResultsView;
});
