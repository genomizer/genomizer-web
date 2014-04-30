
define([
	'text!templates/upload/Upload.html',
],

function(UploadTemplate) {
	var AddExperiment = Backbone.View.extend({
		TEMPLATE: _.template(UploadTemplate),
		initialize: function() {
			this.AnnotationTypes = app.annotationTypes;

		},
		render: function() {
			this.$el.html(this.TEMPLATE());
		},
		events: {
			"change #inputFile": "display",
			"click #CreateExperiment": "createExperiment"
		},
		display: function() {
			var files = $("#inputFile")[0].files;
			var FileArray = [];
			for (var i = 0; i < files.length; i++) {
				
				//console.log(files[i].name);
				this.File.filename = files[i].name;
				this.File.size = (files[i].size);	
				//console.log(this.File.filename);
				FileArray.push(this.File);
			}
			for (var i = 0; i < files.length; i++) {
				console.log(FileArray[i].filename);
				console.log(FileArray[i].size);
			}
		},
		createExperiment: function() {
			$('#ExperimentButtons').hide();
			$('#input-container').show();
			//console.log("AnnotationTypes: ", AnnotationTypes);
			//_.each(this.Annotation,);
			this.AnnotationTypes.each(function(value,key) {
				value = _.pick(value,'attributes');
				var annot = _.values(value)[0];
				console.log("annot: ", annot);
				if (_.isArray(annot.value)) {
					console.log(annot.name + " is array");
					$("#input-container").append("<b>ARRAYYYYYY! :)</b><br/>");
				}

				console.log("Key: ", key);
			});
		}
	});
	return AddExperiment;
});
