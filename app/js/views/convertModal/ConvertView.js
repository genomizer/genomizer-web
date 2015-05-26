/**
 * A simple view class that is used for displaying a side menu in every 
 * other admin view.
 */
define(['text!templates/convertModal/ConvertTemplate.html'], 
    function(ConvertTemplate) {
    var SysadminMainView = Backbone.View.extend({
        TEMPLATE: _.template(ConvertTemplate),
        initialize: function(options) {
            this.queryArray = options.query.split('?');
            //Console.log(queryArray.at(0));
            this.render();
        },
        
        render: function() {
            alert(this.queryArray);
            this.$el.html(this.TEMPLATE({'files':this.queryArray}));
        }
    });
    return SysadminMainView;
});