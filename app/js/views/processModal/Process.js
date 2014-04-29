define([
	'text!templates/ModalAC.html',
	'views/ModalAC'
],function(template,ModalAC) {
	var Modal = ModalAC.extend({
		TEMPLATE: _.template('<div class="modal-body"> ...  </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary">Save changes</button> </div>'),
		TEMPLATE_VARS: {
			modalTitle: "Process"
		},
		render: function() {
			this.$el.html(this.TEMPLATE());	
		}
	});
	return Modal;
});
