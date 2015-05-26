/**
 * A simple view class that is used for displaying a side menu in every 
 * other admin view.
 */
define(['text!templates/sysadmin/SysadminMainTemplate.html'], function(SysadminMainTemplate) {
	var SysadminMainView = Backbone.View.extend({

		TEMPLATE: _.template(SysadminMainTemplate),
		initialize: function() {
			this.render();
		},
		
		render: function() {
			this.$el.html(this.TEMPLATE());
		},
	});
	return SysadminMainView;
});

