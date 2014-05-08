define(['text!templates/sysadmin/SysadminMainTemplate.html'], function(SysadminMainTemplate) {
	var SysadminMainView = Backbone.View.extend({
		TEMPLATE: _.template(SysadminMainTemplate),
		initialize: function() {
			this.render();
		},
		
		render: function() {
			this.$el.html(this.TEMPLATE());
		}
	});
	return SysadminMainView;
});

