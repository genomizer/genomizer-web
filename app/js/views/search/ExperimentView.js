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
			"click .expand-experiment-button": "toggleTypeRows",
			"click .expand-file-button": "toggleFileRows",
			"click .checked-input": "fileSelect",
		},
		toggleTypeRows: function(event) {
			$(event.delegateTarget).toggleClass("expanded");
		},
		toggleFileRows: function(event) {
			$(event.delegateTarget).toggleClass($(event.currentTarget).data("filetype") + "-expanded");
		},
		fileSelect: function(event) {
			var fileID = $(event.currentTarget).closest("tr").data("id");
			this.model.trigger("fileSelect", this.model, fileID,  $(event.currentTarget).prop("checked"));
			//event.preventDefault();
		}
		
	});
	return ExperimentView;

});