/**
 * A simple view class that is used for displaying a side menu in every 
 * other admin view.
 */
define(['text!templates/convertModal/ConvertTemplate.html'], 
    function(ConvertTemplate) {
    var SysadminMainView = Backbone.View.extend({
        TEMPLATE: _.template(ConvertTemplate),
        initialize: function() {
            this.render();
        },
        
        render: function() {
            this.$el.html(this.TEMPLATE());
        }
    });
    return SysadminMainView;
});