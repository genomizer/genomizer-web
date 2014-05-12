define([
	'text!templates/Messenger.html'
],function(Template) {
	var Messenger = Backbone.View.extend({
		fadeTime: 500,
		ignoreErrors: {},
		handleErrors: {
			"502" : function() {
				return "Unable to connect to the server: Server application not responding.";
			},
			"400" : function() {
				return "The given search query is invalid, please rewrite it and try again.";
			},
		},
		TEMPLATE: _.template(Template),
		events: {
			"click .close" : "closeAlert"
		},
		initialize: function() {
			this.setElement($(".alert-container"));
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

			var that = this;
			var element = this.$el.find(".alert");
			var newElement = $(this.TEMPLATE({type:type,message:message}));
			if(element.length != 0) {
				element.fadeOut(500, function() {
					$(this).remove();
					that.$el.append(newElement);
					newElement.fadeIn(that.fadeTime);
				})
			} else {
				this.$el.append(newElement);
				newElement.fadeIn(this.fadeTime);
			}
		},
		closeAlert: function(ev) {
			$(ev.target).closest(".alert").fadeOut(this.fadeTime, function() {
				$(this).remove();
			});
		}
		
	});
	return Messenger;
});


