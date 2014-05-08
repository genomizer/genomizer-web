define([], function() {
	var Gateway = Backbone.Model.extend({
	}, {
		url : "http://genomizer.apiary-mock.com",

		getURL : function() {
			return this.url;
		},

		createPacket : function(type, urlExtension, payload) {
			var result = false;
			$.ajax({
				type : type,
				Authorization : "12411",
				ContentType : "application/json",
				url : this.url + urlExtension,
				dataType : 'json',
				username : "",
				password : "",
				data : JSON.stringify(payload),
				success : function() {
					alert("Thanks!");
					result = true;
				},
				error : function() {
					result = false;
				}
			});
			return result;
		},

		postAnnotation : function(payload) {
			return this.createPacket("POST", "/annotation", payload);
		},

		deleteAnnotation : function(payload) {
			return this.createPacket("DELETE", "/annotation", payload);
		}
	});
	return Gateway;
});
