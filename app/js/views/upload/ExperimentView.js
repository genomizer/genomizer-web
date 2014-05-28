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
			this.model.files.on("uploadProgress",this.renderUploadProgress,this);
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
		renderUploadProgress: function() {
			if(!this.model.files.hasUnfinishedUploads() && this.model.files.length) {
				this.$('.panel-heading').css('background','#5cb85c');
			} else {
				var progress = this.model.files.getTotalUploadProgress() * 100;
				this.$('.panel-heading').css('background','linear-gradient(to right, #428bca 0%, #428bca '+ progress +'%,#f5f5f5 ' + (Math.min(100,progress + 0.0001)) + '%, #f5f5f5)');
			}
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
			this.$("#experiment-form button[type=submit]").button('loading');
			if(this.model.isNew()) {
				this.model.save(null,{success:function() {
					that.uploadFiles();
				},error: function() {
					that.$("#experiment-form button[type=submit]").button('reset');
				}
				});
			} else {
				this.uploadFiles();
			}
			
		},
		uploadFiles: function() {
			var that = this;
			that.collapseView();
			that.model.updateExperimentIdsForFiles();
			that.model.files.fetchAndSaveFiles();
			$('#uploadAllButton').prop('disabled', true);
			that.model.collection.remove(that.model);
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
