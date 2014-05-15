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
			"drop":"dropHandler"
		},
		render: function() {
			this.$el.html(this.TEMPLATE());
			
			this.annotationsForm = new AnnotationsForm({model:this.model});
			this.annotationsForm.setElement(this.$el.find(".newAnnotation"));
			

			this.fileUploadList = new FileUploadList({collection:this.model.getFiles()});
			this.fileUploadList.setElement(this.$el.find(".fileUploadList"));
			
			this.annotationsForm.render();
			this.fileUploadList.render();
		},
		removeExperiment: function() {
			this.el.remove();
			this.model.collection.remove(this.model);
		},
		cloneExperiment: function() {
			this.trigger('cloneEvent',this.model);
		},
		saveExperiment: function(e) {
			e.preventDefault();
			var that = this;

			/*
			 * Begin of ugly fix, we remove ExpID from annotations
			 * so that the request function (collidies with experiment_name on the server)
			 */
			var annots = this.model.get("annotations");
			var newAn = []
			_.each(annots,function(an) {
				if(an.name != "ExpID") {
					newAn.push(an);
				}
			});
			this.model.set("annotations",newAn);

			/*
			 * END OF FIX
			 */

			//this.model.unset("files");
			//annots = _.map(annots,function(an) {
			//	return _.omit(an,'id');
			//});
			this.model.set("annotations",[{id:8,name:"Development Stage",value:"aster"}]);
			this.model.set("createdBy","jonas");
			this.model.set("name","webb-"+Date.now());
			this.model.save(null,{success:function() {
				that.model.updateExperimentIdsForFiles();
				that.model.files.fetchAndSaveFiles();
			}
			});
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
