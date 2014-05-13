define([], function() {
	var Gateway = Backbone.Model.extend({
	}, {
		url : "http://scratchy.cs.umu.se:8000/api",
//http://genomizer.apiary-mock.com
//http://scratchy.cs.umu.se:7000
		getURL : function() {
			return this.url;
		},

		sendPacket : function(type, urlExtension, payload, successMsg) {
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
						alert(successMsg);
						result = true;
					} 
				},
			});
			return result;
		},

		postAnnotation : function(payload) {
			var successMsg = "Successfully created the annotation";
			return this.sendPacket("POST", "/annotation", payload, successMsg);
		},

		deleteAnnotation : function(payload, id) {
			var successMsg = "Successfully deleted the annotation";
			return this.sendPacket("DELETE", "/annotation/" + id, payload, successMsg);
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
			return this.sendPacket("PUT", "/annotation/removevalues/" + id, payload, successMsg);
		},
		
		addAnnotationValues : function(payload, id) {
			
		}
	});
	return Gateway;
});
