define([
	'text!templates/process/ratio/RatioBlock.html',
    'views/process/ratio/RatioEntry',
], function(ratioBlockTemplate, RatioEntry) {
	return Backbone.View.extend({

		TEMPLATE: _.template(ratioBlockTemplate),

		events: {
			"click #add_ratio_entry": "addEntry",
            "click #close_ratio_block": "removeCommand"
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
		},
		addEntry: function (e) {
            e.preventDefault();
            var entryView = new RatioEntry();
            this.renderView(this, entryView);
        },
        removeCommand: function (e) {
            e.preventDefault();
            this.el.remove();
        },
		renderView: function(view, entryView) {
			entryView.render();
			view.$("#ratio_entries").append(entryView.el);
		}
	});
});
