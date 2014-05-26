define([
	'text!templates/authModal/AuthModal.html',
	'views/ModalAC'
],function(template,ModalAC) {
	var AuthModal = ModalAC.extend({
		TEMPLATE: _.template(template),
		TEMPLATE_VARS: {
			modalTitle: "Login"
		},
		events: {
			'submit form':'submitLogin',
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
		},
		submitLogin: function(e) {
			var that = this;
			e.preventDefault();
			this.updateModel();
			this.$('button[type=submit]').button('loading');
			
			this.model.doLogin()
			
			this.model.once('loggedIn',function() {
				that.hide();
			});
		},
		updateModel: function() {
			var input = {};
			this.$("input, select").each(function() {
				var $this = $(this);
				input[$this.attr("name")] = $this.val();
			});
			this.model.set(input);
		}
	});
	return AuthModal;
});

