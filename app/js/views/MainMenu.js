define([
	'text!templates/MainMenu.html',
	'views/processStatus/ProcessPopover'
],function(Template, ProcessPopover) {
	var MainMenu = Backbone.View.extend({
		TEMPLATE: _.template(Template),
		initialize: function(options) {
			_.bindAll(this,'render')
			options.router.on("route",this.render);
			this.processPopover = new ProcessPopover({ collection: app.processStatuses });
			this.processPopover.on("show", this.onProcessShow, this);
			this.processPopover.on("hide", this.onProcessHide, this);
		},
		render: function(route) {
			this.$el.html(this.TEMPLATE({route:route}));
			 this.$el.find("#process_container").append(this.processPopover.$el);
		},
		events: {
			"click #process_container > a" : "openProcessPopover"
		},
		openProcessPopover: function() {
			this.processPopover.show();
		},
		onProcessShow: function() {
			this.$el.find("#process_container").addClass("open");
		},
		onProcessHide: function() {
			this.$el.find("#process_container").removeClass("open");
		}
		
	});
	return MainMenu;
});
