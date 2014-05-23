define([
	'views/search/ExperimentView',
	'text!templates/search/headerTemplate.html'
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

				// render table header
				this.$el.html(this.headerTemplate({annotations: this.annotations}));


				// create and render experiment views
				this.collection.each(function(experiment) {
					var experimentView = new ExperimentView({
						annotations: this.annotations,
						model : experiment,
					});

					experimentView.render();
					this.$el.append(experimentView.$el);
				}, this);
			}
				
		},
		checkFiles: function() {
			//REFACTOR
			var fileRows = this.$el.find(".file-row");
			var selectedFiles = this.collection.getSelectedFiles();
			
			fileRows.each(function() {
				var isChecked = false;
				var row = $(this);
				for (var i = selectedFiles.length - 1; i >= 0; i--) {
					if(row.data("id") == selectedFiles.at(i).get("id")) {
						isChecked = true;
					}
				}

				row.find(".checked-input").prop("checked", isChecked);
			});
		}
		
	});
	return SearchResultsView;
});
