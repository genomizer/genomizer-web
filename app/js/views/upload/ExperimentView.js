define([
	'text!templates/upload/ExperimentContainer.html',
	'views/upload/AnnotationsForm',
	'views/upload/FileUploadList',
	'models/Experiment',
	'models/sysadmin/Gateway', 
],

/*
*	Class: 		ExperimentView.js
*	Author: 		Web development group.
*	Template: 	ExperimentContainer.html
*
*	Description:  	Handles actions done in the ExperimentView such as
*			uploading files, creating Experiments and creating 
*			experiments.
*
*/
function(ExperimentTemplate,AnnotationsForm,FileUploadList,Experiment,Gateway) {
	var ExperimentView = Backbone.View.extend({
		TEMPLATE: _.template(ExperimentTemplate),
		initialize: function() {
			this.model.files.on("add remove",this.onChangeUploadable,this);
			this.model.files.on("uploadProgress",this.renderUploadProgress,this);
			this.dragster = new Dragster( this.el );
			_.bindAll(this, "changed");
		},

		/**
		* Lists of all the events that can happen in the current view.
		*/
		events: {
			"click #uploadFilesButton": "saveExperiment",
			"click #updateAnnotations":"changeAnnotations",
			"click #removeExperiment": "removeExperiment",
			"click #minimizeExperiment":"minimizeExperiment",
			"click #restoreExperiment":"openExperiement",
			"click #cloneButton": "cloneExperiment",
			"dragenter":"dragEnterHandler",
			"dragleave":"dragLeaveHandler",
			"dragover":"dragOverHandler",
			"dragster:enter":"dragsterEnter",
			"dragster:leave":"dragsterLeave",
			"drop":"dropHandler",
			'keyup input[name="Experiment name"]':"changeLabelName",
	    		"change input" :"changed",
	    		"change #annotation_fields":"changed"
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
			this.$("#uploadFilesButton").attr("disabled",false);
		},
		renderUploadProgress: function() {
			if(!this.model.files.hasUnfinishedUploads() && this.model.files.length) {
				this.$('.panel-heading').css('background','#5cb85c');
			} else {
				var progress = this.model.files.getTotalUploadProgress() * 100;
				this.$('.panel-heading').css('background','linear-gradient(to right, #428bca 0%, #428bca '+ progress +'%,#f5f5f5 ' + (Math.min(100,progress + 0.0001)) + '%, #f5f5f5)');
			}
		},

		/**
		* Action handler for handling events when the annotations 
		* textfields are changed or they value has been updated.
		*/
		changed:function(evt) {
			//Enable button update button.
			this.$("#updateAnnotations").attr("disabled",false);
   		},

   		/*
   		* Change annotation function for updating annotations for an experiment.
   		* Uses a PUT request for the experiment and sends the new information in a
   		* JSON object to the Java server.
   		*/
   		changeAnnotations:function(){
   			var that = this;
   			//send JSON request.
   			this.model.save(null,{success:function() {
				},error: function() {
					that.$("#uploadFilesButton").button('reset');
				}
			});
   		},

   		/**
   		* Minimize the current experiement.
   		*/
   		minimizeExperiment:function(){
   			this.collapseView();

   			//Change the icon of the minimize button a "fullscreen" icon.
   			this.$el.find("#minimizeExperiment").children().addClass("glyphicon-resize-full").removeClass("glyphicon-minus");
   			this.$el.find("#minimizeExperiment").attr("id","restoreExperiment");
   		},

   		/*
   		*
   		* Opens a minimized experiment.
   		*/
   		openExperiement:function(){
   			this.$el.find('.panel-collapse').collapse('show');
			this.$el.removeClass('collapsed-experiment');

			this.$el.find("#restoreExperiment").attr("id","minimizeExperiment");
			this.$el.find("#minimizeExperiment").children().addClass("glyphicon-minus").removeClass("glyphicon-resize-full");
   		},

		changeLabelName: function() {
 			if(this.model.get('name').length >0) {
 				if($.trim(this.model.get('name')) == '') {
 					this.$el.find('.panel-heading').text("Unnamed Experiment");
 				} else {
 					this.$el.find('.panel-heading').text(this.model.get("name"));
 				}
 			} else {
 				this.$el.find('.panel-heading').text("Unnamed Experiment");
 			}
		},
		removeExperiment: function() {
			this.trigger('removeEvent',this);
		},
		cloneExperiment: function() {
			this.trigger('cloneEvent',this.model, this.$el);
		},
		saveExperiment: function(e) {
			e.preventDefault();
			var that = this;

			if(this.model.isNew()) {
				this.model.save(null,{success:function() {
					that.uploadFiles();
				},error: function() {
				}
				});
			} else {
				this.uploadFiles();
			}
		},
		uploadFiles: function() {
			var that = this;

		             //this.model is of type Experiment.
			that.model.updateExperimentIdsForFiles();

		          	 // this.model.files is of type Files.
			that.model.files.fetchAndSaveFiles();
			
			that.model.collection.remove(that.model);
		},

		/**
		* Private function, should not be called globally.
		*/
		collapseView: function(){
			this.$el.find('.panel-collapse').collapse('hide');
			this.$el.addClass('collapsed-experiment');
		},
		onChangeUploadable: function() {
			this.$("#uploadFilesButton").attr("disabled",false);
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
