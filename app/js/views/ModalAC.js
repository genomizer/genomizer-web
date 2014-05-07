define([
	'text!templates/ModalAC.html'
],function(template) {
	var ModalAC = Backbone.View.extend({
		MODAL_TEMPLATE: _.template(template),
		TEMPLATE_VARS: {
			modalTitle: "Modal Title"
		},
		initialize: function(options) {
			this.$modal = $(this.MODAL_TEMPLATE(this.TEMPLATE_VARS));
			this.$el = this.$modal.find(".modal-inner-content");

			

		},
		show: function () {

			// store previous url
			console.log("router", Backbone.history.fragment)

			// render
			this.render();
			this.$modal.appendTo($("body"));
			this.$modal.modal('show');
			this.$modal.on('hidden.bs.modal',_.bind(this.removeModal,this));
		},
		hide: function () {
			this.$modal.modal('hide');
			
		},
		removeModal: function() {

			app.router.previous({trigger:false});
			this.$modal.remove();

		}
	});
	return ModalAC;
});
