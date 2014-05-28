define([
	'text!templates/processStatus/processPopover.html',
	'text!templates/processStatus/processGroup.html',
	'collections/ProcessStatuses',
	'moment'
],function(templateHtml, templateGroupHtml, ProcessStatuses, moment) {
	
	var QueryBuilder = Backbone.View.extend({
		template: _.template(templateHtml),
		templateGroup: _.template(templateGroupHtml),
		tagName: "div",
		className: "process-popover popover bottom in",
		initialize: function(options) {
			var that = this;

			// we need to define it like this so that we can reference the popover inside
			this.documentClickHandler = function(e) {
				if(that.$el.has($(e.target)).length == 0) {
					that.hide();
				}
			}

			this.collection.on("sync", this.render, this);

			this.render();

			$(document.body).tooltip({
				selector: '.process-popover .status-cell span'
			});
		},
		render: function() {
			this.$el.html(this.template());


			if(this.collection.length > 0) {
				// split collection arrays of processes by types
				var waiting = this.collection.where({status: "Waiting"});
				var started = this.collection.where({status: "Started"});
				var crashed = this.collection.where({status: "Crashed"});
				var finished = this.collection.where({status: "Finished"});
				

				// format and render data
				if(waiting.length > 0)
					this.$el.find("table").append(this.templateGroup({ "processes": this.formatProcessData(waiting), "status": "waiting" }));
				if(started.length > 0)
				this.$el.find("table").append(this.templateGroup({ "processes": this.formatProcessData(started), "status": "started" }));
				if(crashed.length > 0)
					this.$el.find("table").append(this.templateGroup({ "processes": this.formatProcessData(crashed), "status": "crashed" }));
				if(finished.length > 0)
					this.$el.find("table").append(this.templateGroup({ "processes": this.formatProcessData(finished), "status": "finished" }));

				this.delegateEvents();
			} else {
				this.$el.find("table").remove();
				this.$el.append($("<div class='popover-content'>No process status available.</div>"));
			}
			
		},
		formatProcessData: function(object) {
			var result = [];
			for (var i = 0; i < object.length; i++) {
				result[i] = {};
				result[i]["status"] = object[i].get("status");
				result[i]["experimentName"] = object[i].get("experimentName");
				result[i]["timeAdded"] = this.formatDate(object[i].get("timeAdded"));
				result[i]["timeStarted"] = this.formatDate(object[i].get("timeStarted"));
				result[i]["timeFinished"] = this.formatDate(object[i].get("timeFinished"));	
			};

			return result;
		},
		formatDate: function(date) {
			if(date != 0) {
				date = new Date(date);
				// the difference between given time and now in hours
				var difference = (new Date() - date) / (1000 * 3600); 

				// if the difference is less than 12 hours
				if( difference < 12 ) { 
					return moment(date).format("HH:mm");
				}

				// if the difference is less than a year
				if( difference < 8765 ) { 
					return moment(date).format("D/M HH:mm");
					//return date.getDate() + "/" + (date.getMonth()+1);
				}

				// if the difference is over a year
				return moment(date).format("D/M -YY");
				

			} else {
				return "";
			}
		},
		show: function() {
			if(!this.isShown) {
				var that = this;
				this.$el.fadeIn(200);

				// it seems as if we need to do this or events wont fire until re-render
				this.delegateEvents();
				this.trigger("show");
				setTimeout(function() {
					$(document).click(that.documentClickHandler);
					that.isShown = true;
				}, 200);
				app.processStatuses.startFetching();
			}
		},
		hide: function() {
			var that = this;
			if(this.isShown) {
				this.$el.fadeOut(200);
				this.trigger("hide");
				setTimeout(function() {
					$(document).unbind("click", that.documentClickHandler);
					that.isShown = false;
				}, 200);

				app.processStatuses.stopFetching();
			}
		},
		events: {
			"click tr" : "clickHandler"
		},
		clickHandler: function(event) {
			app.router.navigate("search/" + $(event.currentTarget).data("expid") + "[ExpID]", {trigger: true});
			this.hide();
		}
	});
	return QueryBuilder;

});