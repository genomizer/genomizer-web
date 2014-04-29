define([
	'collections/Files'
],function(FilesCollection) {

	var FileView = Backbone.View.extend({

		TEMPLATE: _.template('<div id="file_coll"></div>'),
		initialize: function() {
			this.model = new FilesCollection();
		},
		//el: $("#search_results_coll"),
		render: function() {
			this.$el.html(this.TEMPLATE());	
		}

	});
	return FileView;
});
