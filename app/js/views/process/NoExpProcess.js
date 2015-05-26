define([
    'text!templates/process/NoExpProcess.html'
], function(noExpProcessTemplate) {

    return Backbone.View.extend({

        TEMPLATE: _.template(noExpProcessTemplate),

        events: {
            "click #submit": "showExp",
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.TEMPLATE());
        },

        showExp: function () {
            var expId = $("#exp_id").val();
            app.router.navigate("process/" + expId, {trigger:true});
        }
    });
});

