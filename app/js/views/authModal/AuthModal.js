define([
	'text!templates/authModal/AuthModal.html',
	'views/ModalAC'
],function(template,ModalAC) {
	var AuthModal = ModalAC.extend({
		TEMPLATE: _.template(template),
		TEMPLATE_VARS: {
			modalTitle: "Login",
			noClose: true
		},
		events: {
			'submit form':'submitLogin',
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
		},
		submitLogin: function(e) {
          
            localStorage.setItem("username", $('input[name=username]').val());

			var that = this;
			e.preventDefault();
			this.updateModel();
			this.$('button[type=submit]').button('loading');
			
            /* NEW:
             * Calls doLogin in Auth.js. model is initalized in
             * Gateway.js as Backbone.Model
             */
			this.model.doLogin();
			
			this.model.once('loggedIn',function() {
				that.hide();
			});
			this.model.once('error',function() {
				that.$('button[type=submit]').button('reset');
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

