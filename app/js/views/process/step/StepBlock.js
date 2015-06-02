define([
	'text!templates/process/step/StepBlock.html',
    'views/process/step/StepEntry',
], function(stepBlockTemplate, StepEntry) {
	return Backbone.View.extend({

		TEMPLATE: _.template(stepBlockTemplate),
		
		events: {
			"click #add_step_entry": "addEntry",
            "click #close_step_block": "removeCommand"
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
		},
		addEntry: function (e) {
            e.preventDefault();
            var entryView = new StepEntry();
            this.renderEntry(this, entryView);
        },
        removeCommand: function (e) {
            e.preventDefault();
            this.model.collection.remove(this.model);
            this.el.remove();
        },
		renderEntry: function(view, entryView) {
			entryView.render();
			view.$("#step_entries").append(entryView.el);
		}
	});
});
