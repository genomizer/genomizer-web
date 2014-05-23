define([
	'text!templates/Messenger.html'
],function(Template) {
	var Messenger = Backbone.View.extend({
		fadeTime: 500,
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


