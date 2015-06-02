define([
    'text!templates/convertModal/NoExpConvert.html'
], function(noExpConvertTemplate) {

    return Backbone.View.extend({

        TEMPLATE: _.template(noExpConvertTemplate),

        events: {
            "click #submit": "showExp",
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.$el.html(this.TEMPLATE());
        }
    });
});