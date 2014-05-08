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
			
			$('#results_container').show();

			if(this.collection.fetching == true) {
				this.$el.html('<div class="loading panel-body"><h2>Loading Search results</h2><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>');

			} else if(this.collection.length == 0){
				this.$el.html('<div class="panel-body">No search results found.</div>');

			} else {

				this.experimentViews = [];

				this.collection.each(function(experiment) {
					this.experimentViews.push(new ExperimentView({
						annotations: this.annotations,
						model : experiment,
					}));
				}, this);

				this.$el.html(this.headerTemplate({annotations: this.annotations}));

				_.each(this.experimentViews, function(experimentView) {
					
					experimentView.render();
					this.$el.append(experimentView.$el);

				}, this);
			}
				
		},
		checkFiles: function(files) {
			//REFACTOR
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
