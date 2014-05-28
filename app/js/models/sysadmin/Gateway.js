/**
 * A class that handles communication with the server. All methods are static.
 */
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

		/**
		 * Sends a packet to the server using the base url and parameters
		 * @param {Object} type - the type of HTTP request, example POST
		 * @param {Object} urlExtension - the extension of the base url
		 * @param {Object} payload - the body of the HTTP request
		 * @param {Object} shouldGoBack - boolean value, true if a back
		 * 				   should be triggered after success
		 * @return true if successful
		 */
		sendPacket : function(type, urlExtension, payload, shouldGoBack) {
			$.ajax({
				type : type,
				ContentType : "application/json",
				url : this.url + urlExtension,
				dataType : 'json',
				Authorization : app.auth.get("token"),
				data : JSON.stringify(payload),
				success : function(data) {
					if (shouldGoBack) {
						history.back();
					}
					return true;
				},
				complete : function(xhr) {

				},
			});

		},

		/**
		 * Performs a post to server to get an URL for uploading genome
		 * release files
		 * @param {Object} genomeReleaseFiles - the collection that
		 * should be uploaded
		 */
		postGenomeRelease : function(genomeReleaseFiles) {
			that = this;

			$.ajax({
				type : "POST",
				ContentType : "application/json",
				url : this.url + "genomeRelease",
				dataType : 'json',
				Authorization : app.auth.get("token"),
				data : JSON.stringify(genomeReleaseFiles.getPayload()),
				success : function(data) {
				},
				complete : function(data) {
					genomeReleaseFiles.uploadGenomeReleaseFiles(eval(data.responseText));
				},
			});

		},

		/**
		 * Performs a POST request to the server to add an annotation
		 * @param {Object} payload - the payload
		 */
		postAnnotation : function(payload) {
			this.sendPacket("POST", "annotation/field", payload, false);
		},

		/**
		 * Performs a Delete request to the server to delete an annotation
		 * @param {Object} payload - the payload
		 * @param {Object} name - the name of the annotation
		 * @param {Object} shouldGoBack - true if a back should trigger
		 */
		deleteAnnotation : function(payload, name, shouldGoBack) {
			this.sendPacket("DELETE", "annotation/field/" + encodeURIComponent(name), payload, shouldGoBack);
		},

		/**
		 * Runs the addAnnotation and deleteAnnotation functions
		 * @param {Object} deletePayload - the payload for the delete
		 * @param {Object} addPayload - the payload for the add
		 * @param {Object} originalName - the original name of the annotation
		 */
		updateAnnotationValues : function(deletePayload, addPayload, originalName) {
			if (deletePayload != -1) {
				this.deleteAnnotationValues(deletePayload, originalName);
			}
			if (addPayload != -1) {
				this.addAnnotationValues(addPayload, originalName);
			}
		},

		/**
		 * Performs a DELETE request to the server to delete annotation values
		 * @param {Object} payload - the payload
		 * @param {Object} name - the name of the annotation
		 */
		deleteAnnotationValues : function(payload, name) {
			var that = this;
			payload.forEach(function(value) {
				that.sendPacket("DELETE", "annotation/value/" + encodeURIComponent(name) + "/" + encodeURIComponent(value), {}, false);
			});
		},

		/**
		 * Performs a POST request to the server to add annotation values
		 * @param {Object} payload - the payload
		 * @param {Object} name - the name of the annotation
		 */
		addAnnotationValues : function(payload, name) {
			var that = this;
			var model = new Backbone.Model();
			payload.forEach(function(value) {
				model.set({
					"name" : name,
					"value" : value
				});
				that.sendPacket("POST", "annotation/value", model, false);
			});
		},

		/**
		 * Performs a PUT request to the server to rename an annotation
		 * @param {Object} payload - the payload
		 */
		renameAnnotation : function(payload) {
			this.sendPacket("PUT", "annotation/field", payload, false);
		},

		/**
		 * Performs a DELETE request to the server to delete a genome Release
		 * @param {Object} specie - the specie of the genome release
		 * @param {Object} genomeVersion - the version of the genomeRelease
		 * @return true if successful
		 */
		deleteGenomeReleaseFile : function(specie, genomeVersion) {
			return this.sendPacket("DELETE", "genomeRelease/" + encodeURIComponent(specie) + "/" + encodeURIComponent(genomeVersion), {}, false);
		}
	});
	return Gateway;
});
