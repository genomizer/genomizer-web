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
				url : this.url + urlExtension,
				dataType : 'json',
				username : "",
				password : "",
				data : JSON.stringify(payload),
				success: function(data){
					if(successFunc != null){
						successFunc(data);
					}
				},
				complete : function(xhr) {
					
				},
				
			});

		},
		
		postGenomeRelease : function(payload, genomeReleaseFile) {
			that = this;

			$.ajax({
				type : "POST",
				ContentType : "application/json",
				url : this.url + "genomeRelease",
				dataType : 'json',
				username : "",
				password : "",
				data : JSON.stringify(payload),
				success : function(data) {
					that.uploadGenomeReleaseFile(data, genomeReleaseFile);
				},
				complete : function(xhr) {

				},
			});

		},
	
		uploadGenomeReleaseFile : function(url, genomeReleaseFile){
			var payload = new FormData();
			console.log(genomeReleaseFile.getFileObj());
			payload.append('uploadfile',genomeReleaseFile.getFileObj());
			$.ajax({
				url: url.URLupload,
				type: "POST",
				data: payload,
				username: "pvt",
				password: "pvt",
				processData: false,
				contentType: false,
		/*		beforeSend: function(jqXHR) {
					debugger;
					jqXHR.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
				}
				xhr: function()
				{
					//Upload progress
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.addEventListener("progress",_.bind(that.setUploadProgress,that), false);
					return xhr;
				} 
*/
			});
		},
 
		postAnnotation : function(payload) {
			this.sendPacket("POST", "annotation/field", payload);
		},

		deleteAnnotation : function(payload, name) {
			this.sendPacket("DELETE", "annotation/field/" + encodeURIComponent(name), payload);
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
				that.sendPacket("DELETE", "annotation/value/" + encodeURIComponent(name) + "/" + encodeURIComponent(value), {});	
			});
		},
		
		addAnnotationValues : function(payload, name) {
			var that = this;
			var model = new Backbone.Model();
			payload.forEach(function(value) {
				model.set({"name" : name, "value" : value});
				that.sendPacket("POST", "annotation/value", model, null);
			});
		},
		
		renameAnnotation : function(payload) {
			this.sendPacket("PUT", "annotation/field", payload, null);
		},
			
		deleteGenomeReleaseFile : function(specie, genomeVersion) {
			this.sendPacket("DELETE", "genomeRelease/" + encodeURIComponent(specie) + "/" + encodeURIComponent(genomeVersion), {});
		}
	});
	return Gateway;
});
