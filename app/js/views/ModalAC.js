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
		render: function() {
			this.$el.html('<div class="modal-body"> ...  </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary">Save changes</button> </div>');	
		},
		show: function () {
			this.render();
			this.$modal.appendTo($("body"));
			this.$modal.modal('show');
			this.$modal.on('hidden.bs.modal',_.bind(this.removeModal,this));
		},
		removeModal: function() {
			this.$modal.remove();

		}
	});
	return ModalAC;
});
