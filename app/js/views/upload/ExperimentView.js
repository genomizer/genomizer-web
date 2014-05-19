define([
	'text!templates/upload/ExperimentContainer.html',
	'views/upload/AnnotationsForm',
	'views/upload/FileUploadList',
	'models/Experiment'
],

function(ExperimentTemplate,AnnotationsForm,FileUploadList,Experiment) {
	var ExperimentView = Backbone.View.extend({
		TEMPLATE: _.template(ExperimentTemplate),
		initialize: function() {
			this.model.files.on("add remove",this.onChangeUploadable,this);
			this.dragster = new Dragster( this.el );
		},
		events: {
			"submit #experiment-form": "saveExperiment",
			"click #removeExperiment": "removeExperiment",
			"click #cloneButton": "cloneExperiment",
			"dragenter":"dragEnterHandler",
			"dragleave":"dragLeaveHandler",
			"dragover":"dragOverHandler",
			"dragster:enter":"dragsterEnter",
			"dragster:leave":"dragsterLeave",
			"drop":"dropHandler",
			'keyup input[name="Experiment name"]':"changeLabelName"
		},
		render: function() {
			window.this = this;
			this.$el.html(this.TEMPLATE());
			
			this.annotationsForm = new AnnotationsForm({model:this.model});
			this.annotationsForm.setElement(this.$el.find(".newAnnotation"));
			

			this.fileUploadList = new FileUploadList({collection:this.model.getFiles()});
			this.fileUploadList.setElement(this.$el.find(".fileUploadList"));
			
			this.annotationsForm.render();
			this.fileUploadList.render();
		},
		changeLabelName: function() {
 			if(this.model.get('name').length >0) {
 				this.$el.find('.panel-heading').text(this.model.get("name"));
 			} else {
 				this.$el.find('.panel-heading').text("Unnamed Experiment");
 			}
		},
		removeExperiment: function() {
			this.trigger('removeEvent',this);
		},
		cloneExperiment: function() {
			this.trigger('cloneEvent',this.model);
		},
		saveExperiment: function(e) {
			e.preventDefault();
			var that = this;
			this.$("#experiment-form button[type=submit]").button('loading');
			this.model.save(null,{success:function() {
				that.model.updateExperimentIdsForFiles();
				that.model.files.fetchAndSaveFiles();
			}
			});
			this.collapseView();
		},
		collapseView: function(){
			this.$el.find('.panel-collapse').collapse('hide');
			this.$el.addClass('collapsed-experiment');
		},
		onChangeUploadable: function() {
			this.$("#experiment-form button[type=submit]").attr("disabled",!this.model.isUploadable());
		},
		dragEnterHandler: function(e) {
			e.stopPropagation();
			e.preventDefault();
		},
		dragOverHandler: function(e) {
			e.stopPropagation();
			e.preventDefault();
		},
		dragsterLeave: function(e) {
			this.$el.removeClass("drag-over");
		},
		dragsterEnter: function(e) {
			this.$el.addClass("drag-over");
		},
		dropHandler: function(e) {
			e.stopPropagation();
			e.preventDefault();
			this.$el.removeClass("drag-over");

			// FIX for dragster, drop causes dragsterEnter to not trigger.
			this.dragster.removeListeners();
			this.dragster = new Dragster( this.el );
			// end of FIX for dragster 
			
			var fileObjs = e.originalEvent.dataTransfer.files;
			this.model.files.addFilesByFileObject(fileObjs);
		}
	});

	return ExperimentView;
});
