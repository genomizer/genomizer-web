define([
	'text!templates/MainMenu.html'
],function(Template) {
	var MainMenu = Backbone.View.extend({
		TEMPLATE: _.template(Template),
		initialize: function(options) {
			_.bindAll(this,'render')
			options.router.on("route",this.render);
		},
		render: function(route) {
			this.$el.html(this.TEMPLATE({route:route}));	
		}
		
	});
	return MainMenu;
});
