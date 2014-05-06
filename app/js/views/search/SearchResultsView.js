define([
	'views/search/ExperimentView',
	'text!views/search/headerTemplate.html'
],function(ExperimentView, headerTemplateHtml) {

	var SearchResultsView = Backbone.View.extend({

		tagName: 'table',
		className: 'table',
		headerTemplate: _.template(headerTemplateHtml),

		initialize: function(options) {
			this.annotations = options.annotations;

			this.collection.on("highlightChange", this.checkFiles, this);
			this.collection.on("change", this.render, this);
			this.collection.on("add", this.render, this);
			//this.render();
		},
		render: function() {
			this.experimentViews = [];

			// create subviews for each experiment in the given collection
			this.collection.each(function(experiment) {
				this.experimentViews.push(new ExperimentView({
					annotations: this.annotations,
					model : experiment,
				}));
			}, this);

			// render header template
			this.$el.html(this.headerTemplate({annotations: this.annotations}));

			_.each(this.experimentViews, function(experimentView) {
				
				// render experiment rows
				experimentView.render();

				// append experiment rows to table
				this.$el.append(experimentView.$el);
			}, this);
		},
		checkFiles: function(files) {
			var rows = this.$el.find(".file-row");
			
			rows.each(function() {
				var isChecked = false;
				var row = $(this);
				for (var i = files.length - 1; i >= 0; i--) {
					if(row.data("id") == files[i].get("id")) {
						isChecked = true;
					}
				}

				row.find(".checked-input").prop("checked", isChecked);
			});
		}
		
	});
	return SearchResultsView;
});
