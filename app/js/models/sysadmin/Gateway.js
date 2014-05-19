define([], function() {
	var Gateway = Backbone.Model.extend({
	}, {
		url : app.BASE_URL,
// app.BASE_URL
//http://genomizer.apiary-mock.com
//http://scratchy.cs.umu.se:7000
		getURL : function() {
			return this.url;
		},

		sendPacket : function(type, urlExtension, payload) {
			$.ajax({
				type : type,
				ContentType : "application/json",
				url : encodeURI(this.url + urlExtension),
				dataType : 'json',
				username : "",
				password : "",
				data : JSON.stringify(payload),
				complete : function(xhr) {
				},
			});
		},
 
		postAnnotation : function(payload) {
			this.sendPacket("POST", "annotation/field", payload);
		},

		deleteAnnotation : function(payload, name) {
			this.sendPacket("DELETE", "annotation/field/" + name, payload);
		},
		
		updateAnnotationValues : function(deletePayload, addPayload, originalName) {
			if (deletePayload != -1) {
				this.deleteAnnotationValues(deletePayload, originalName);
			}
			if (addPayload != -1) {
				this.addAnnotationValues(addPayload, originalName);
			}
		},
		
		deleteAnnotationValues : function(payload, name) {
			var that = this;
			payload.forEach(function(value) {
				that.sendPacket("DELETE", "annotation/value/" + name + "/" + value, {});	
			});
		},
		
		addAnnotationValues : function(payload, name) {
			var that = this;
			var model = new Backbone.Model();
			payload.forEach(function(value) {
				model.set({"name" : name, "value" : value});
				that.sendPacket("POST", "annotation/value", model);
			});
		},
		
		renameAnnotation : function(payload) {
			this.sendPacket("PUT", "annotation/field", payload);
		}
		
	});
	return Gateway;
});
