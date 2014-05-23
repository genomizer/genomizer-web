define([
	'text!templates/loginModal/login.html'
],function(loginTemplate) {
	var Modal = ModalAC.extend({
		TEMPLATE: _.template(loginTemplate),
		initialize: function(options) {
			this._super();
			
		},
		events: {
		},
		render: function() {

			this.$el.html(this.TEMPLATE());
		}
	});
	return Modal;
});