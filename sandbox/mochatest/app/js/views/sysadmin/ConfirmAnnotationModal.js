/**
 * A view class for the modal used to confirm the creation of a new annotation
 */
define([
	'text!templates/sysadmin/ConfirmAnnotationModalTemplate.html',
	'views/ModalAC'
],function(caTemplate,ModalAC) {
	var Modal = ModalAC.extend({
		TEMPLATE_VARS: {
			modalTitle: "Confirm New Annotation"
		},
		
		initialize: function(values, newAnnotationView) {
			this._super();
			this.newAnnotationView = newAnnotationView;
			this.template = _.template(caTemplate, {values : values});
		},
		
		events: {
			"click #confirmAnnotation-btn" : "post",
			"click #cancelAnnotation-btn" : "cancel"
		},
		
		render: function() {
			this.$el.html(this.template);	
		},

		/**
		 * Calls the newAnnotationView to post the new annotation
		 */
		post : function() {
			this.newAnnotationView.postNewAnnotation();
			this.hide();
		},
		
		cancel : function() {
			this.hide();
		},
		
		removeModal: function() {
			this.$modal.remove();
		}
		
	});
	return Modal;
});
