define([
	'text!templates/ModalAC.html'
],function(template) {
	var ModalAC = Backbone.View.extend({
		MODAL_TEMPLATE: _.template(template),
		TEMPLATE_VARS: {
			modalTitle: "Modal Title",
			// noClose: true, supply to only allow modal to be closed programatically.
		},
		initialize: function(options) {
			this.$modal = $(this.MODAL_TEMPLATE(this.TEMPLATE_VARS));
			this.$el = this.$modal.find(".modal-inner-content");
		},
		show: function () {

			// render
			this.render();
			this.$modal.appendTo($("body"));
			if(this.TEMPLATE_VARS.noClose) {
				this.$modal.modal({
					backdrop: 'static',
					keyboard: false
				});
			}
			this.$modal.modal('show');
			this.$modal.on('hidden.bs.modal',_.bind(this.removeModal,this));
		},
		hide: function () {
			this.$modal.modal('hide');
			
		},
		removeModal: function() {

			// attempt to navigate to previous page, go to search if no previous
			if(app.router.hasPrevious()) {
				app.router.previous({trigger:false});
			} else {
				app.router.navigate('search', {trigger:true})
			}
			this.$modal.remove();

		}
	});
	return ModalAC;
});
