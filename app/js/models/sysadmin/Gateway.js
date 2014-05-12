define([], function() {
	var Gateway = Backbone.Model.extend({
	}, {
		url : "http://scratchy.cs.umu.se:7000",
//http://genomizer.apiary-mock.com
//http://scratchy.cs.umu.se:7000
		getURL : function() {
			return this.url;
		},

		sendPacket : function(type, urlExtension, payload) {
			var result = false;
			$.ajax({
				type : type,
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
			return this.sendPacket("POST", "/annotation", payload);
		},

		deleteAnnotation : function(payload, id) {
			return this.sendPacket("DELETE", "/annotation/" + id, payload);
		},
		
		deleteAnnotationValues : function(payload, id) {
			return this.sendPacket("PUT", "/annotation/removevalues/" + id, payload);
		},
		
		addAnnotationValues : function(payload, id) {
			
		}
	});
	return Gateway;
});
