define([
	'text!templates/Messenger.html'
],function(Template) {
	var Messenger = Backbone.View.extend({
		ignoreErrors: {},
		handleErrors: {
			"502" : function() {
				return "Unable to connect to the server: Server application not responding.";
			},
			"400" : function() {
				return "Your search query is invalid, please rewrite it and try again.";
			},
		},
		TEMPLATE: _.template(Template),
		events: {
			"click .close" : "closeAlert"
		},
		success: function(message) {
			this.alert("success",message);
		},
		info: function(message) {
			this.alert("info",message);
		},
		warning: function(message) {
			this.alert("warning",message);
		},
		danger: function(message) {
			this.alert("danger",message);
		},

		alert: function(type,message) {
			this.$el.append(this.TEMPLATE({type:type,message:message}));	
		},
		closeAlert: function(ev) {
			$(ev.target).closest(".alert-wrap").remove();
		}
		
	});
	return Messenger;
});


