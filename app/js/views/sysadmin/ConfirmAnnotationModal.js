define([
	'text!templates/sysadmin/ConfirmAnnotationModalTemplate.html',
	'views/ModalAC'
],function(caTemplate,ModalAC) {
	var Modal = ModalAC.extend({
		TEMPLATE_VARS: {
			modalTitle: "Confirm New Annotation"
		},
		initialize: function(annotation) {
			this._super();
			
			this.template = _.template(caTemplate, {annotation : annotation});
			this.annotation = annotation;
		},
		events: {

		},
		render: function() {
			this.$el.html(this.template);	
		},
		
	});
	return Modal;
});
