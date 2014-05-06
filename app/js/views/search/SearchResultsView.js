define([
	'views/search/ExperimentView',
	'text!views/search/headerTemplate.html'
],function(ExperimentView, headerTemplateHtml) {

	var SearchResultsView = Backbone.View.extend({

		tagName: 'table',
		className: 'table search-table',
		headerTemplate: _.template(headerTemplateHtml),

		initialize: function(options) {
			this.annotations = options.annotations;

			this.collection.on("highlightChange", this.checkFiles, this);
			this.collection.on("change", this.render, this);
			this.collection.on("sync", this.render, this);
			this.render();
		},
		render: function(event) {
			
			//show the 'Search results' header
			$('#results_container').show();

			//if we are currently fetching, show loading spinner
			if(this.collection.fetching == true) {
				this.$el.html('<div class="loading panel-body"><h2>Loading Search results</h2><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>');
			//if we are done fetching, render the search results
			} else {
				
				this.experimentViews = [];

				// create subviews for each experiment in the given collection
				this.collection.each(function(experiment) {
					this.experimentViews.push(new ExperimentView({
						annotations: this.annotations,
						model : experiment,
					}));
				}, this);

				//if we did not get any results from our search, tell the user that we didn't
				if(this.collection.length == 0) {
					this.$el.html('<div class="panel-body">No search results found.</div>');

				//if we did get results, render them
				} else {
					// render header template
					this.$el.html(this.headerTemplate({annotations: this.annotations}));

					_.each(this.experimentViews, function(experimentView) {
						
						// render experiment rows
						experimentView.render();

						// append experiment rows to table
						this.$el.append(experimentView.$el);
					}, this);
				}
			}
		},
		// The checkFiles function goes through the file models
		// and examines whether the file is checked or not. If
		// the file is checked, it updates the view to display that.
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
