define([
	'text!templates/MainMenu.html'
],function(Template) {
	var MainMenu = Backbone.View.extend({
		TEMPLATE: _.template(Template),
		initialize: function(options) {
			options.router.on("route",_.bind(this.render,this));
			this.render();

		},
		el: $("#main-menu"),
		render: function(route) {
			this.$el.html(this.TEMPLATE({route:route}));	
		}
		
	});
	return MainMenu;
});
