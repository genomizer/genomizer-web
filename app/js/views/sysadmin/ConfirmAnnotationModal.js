define([
	'text!templates/sysadmin/ConfirmAnnotationModalTemplate.html',
	'views/ModalAC'
],function(caTemplate,ModalAC) {
	var Modal = ModalAC.extend({
		TEMPLATE_VARS: {
			modalTitle: "Confirm New Annotation"
		},
		initialize: function(values, postNewAnnotation) {
			this._super();
			this.post = postNewAnnotation;
			this.template = _.template(caTemplate, {values : values});
			this.annotation = annotation;
		},
		events: {
			"click #confirmAnnotation-btn" : "posta"
		},
		render: function() {
			this.$el.html(this.template);	
		},
		
		removeModal: function() {
			console.log('closed');
		},
		
		posta : function() {
			this.post.clearForm();
			this.removeModal();
		}
		
	});
	return Modal;
});
