define([
	'text!templates/process/smooth/SmoothBlock.html',
    'views/process/smooth/SmoothEntry',
], function(smoothBlockTemplate, SmoothEntry) {
	return Backbone.View.extend({

		TEMPLATE: _.template(smoothBlockTemplate),
		
		initialize: function(options) {
			this.collection = new Backbone.Collection();
		},
		events: {
			"click #add_smooth_entry": "addEntry",
            "click #close_smooth_block": "removeCommand"
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
		},
		addEntry: function (e) {
            e.preventDefault();
            var entryView = new SmoothEntry();
            this.renderView(this, entryView);
        },
        removeCommand: function (e) {
            e.preventDefault();
            this.el.remove();
        },
		renderView: function(view, entryView) {
			entryView.render();
			view.$("#smooth_entries").append(entryView.el);
		}
	});
});
