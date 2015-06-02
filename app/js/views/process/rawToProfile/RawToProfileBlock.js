define([
    'text!templates/process/rawToProfile/RawToProfileBlock.html',
    'views/process/rawToProfile/RawToProfileEntry',
], function(rawToProfileBlockTemplate, RawToProfileEntry) {
    return Backbone.View.extend({

        TEMPLATE: _.template(rawToProfileBlockTemplate),

        events: {
            "click #add_raw_to_profile_entry": "addEntry",
            "click #close_raw_to_profile_block": "removeCommand",
        },
        render: function() {
            this.$el.html(this.TEMPLATE());
        },
        addEntry: function (e) {
            e.preventDefault();
            var entryView = new RawToProfileEntry();
            this.renderEntry(this, entryView);
        },
        removeCommand: function (e) {
            e.preventDefault();
            this.el.remove();
        },
        renderEntry: function (view, entryView) {
            var grNames = [];
            this.collection.forEach(function (gr) {
                grNames.push(gr.get('genomeVersion'));
            });
            console.log(grNames);
            entryView.render(grNames);
            view.$("#raw_to_profile_entries").append(entryView.el);
        }
    });
});

