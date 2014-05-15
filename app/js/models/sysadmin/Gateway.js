define([], function() {
	var Gateway = Backbone.Model.extend({
	}, {
		url : app.BASE_URL,
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
				complete : function(xhr) {
					if (xhr.status == 200 || xhr.status == 201) {
						result = true;
					} else {
						result = false;
					} 
				},
			});
			return result;
		},

		postAnnotation : function(payload) {
			return this.sendPacket("POST", "annotation", payload);
		},

		deleteAnnotation : function(payload, name) {
			return this.sendPacket("DELETE", "annotation/" + name, payload);
		},
		
		updateAnnotationValues : function(deletePayload, addPayload, id) {
			if (deletePayload != -1) {
				this.deleteAnnotationValues(deletePayload, id, successMsg);
			}
			if (addPayload != -1) {
				this.addAnnotationValues(addPayload, id, successMsg);
			}
		},
		
		deleteAnnotationValues : function(payload, id) {
			return this.sendPacket("PUT", "annotation/removevalues/" + id, payload, successMsg);
		},
		
		addAnnotationValues : function(payload, id) {
			
		}
	});
	return Gateway;
});
