define([
	'text!templates/search/builderTemplate.html',
	'text!templates/search/builderAnnotationTemplate.html'
],function(templateHtml, annotationTemplate) {
	
	var QueryBuilder = Backbone.View.extend({
		template: _.template(templateHtml),
		annotationTemplate: _.template(annotationTemplate),
		isAppending: true,
		isShown: false,
		tagName: "div",
		className: "query-builder popover bottom in",
		initialize: function(options) {
			var that = this;

			// we need to define it like this so that we can reference the querybuilder inside to unbind
			this.documentClickHandler = function(e) {
				if(that.$el.has($(e.target)).length == 0 && $(e.target).attr("id") != "search_input") {
					that.hide();
				}
			}

			this.render();
		},
		render: function() {
			this.$el.append(this.template({"annotations": app.annotationTypes}));			
			if(this.isAppending) {
				this.$el.addClass("appending");
			} else {
				this.$el.removeClass("appending");
			}
		},
		setAppending: function(isAppending) {
			this.isAppending = isAppending;
			if(isAppending) {
				this.$el.addClass("appending");
			} else {
				this.$el.removeClass("appending");
			}
		},
		show: function() {
			if(!this.isShown) {
				var that = this;
				this.$el.fadeIn(200);
				this.trigger("show");
				setTimeout(function() {
					$(document).click(that.documentClickHandler);
					that.isShown = true;
				}, 200);
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
			}
			
		},
		events: {
			"click .btn-add" : "addClickHandler",
			"click .op-dropdown a": "opClickHandler",
			"click .annotation-dropdown a": "annotationClickHandler",
			"click .choice-dropdown a": "choiceClickHandler"
		},
		addClickHandler: function() {
			var string = "";
			var op = this.$el.find(".op-container .dropdown-label").text();
			var annotation = this.$el.find(".annotation-container .dropdown-label").text();
			var value = this.$el.find(".freetext-container input").val();
			
			if (this.$el.find(".choice-container .dropdown-label").is(":visible")) {

				if (value == "") {
					value = this.$el.find(".choice-container .dropdown-label").text();
				} 

				if (value == "value") {
					app.messenger.warning("Please select a value");
					return;
				}
			}

			if(annotation == "annotation") {
				app.messenger.warning("Please select an annotation.");
				return;
			}

			string += value;

			string += "[" + annotation + "]";

			if(op != "op") {
				string = op + " " + string;
			}

			this.$el.find(".op-container .dropdown-label").text("op");
			this.$el.find(".annotation-container .dropdown-label").text("annotation");
			this.$el.find(".freetext-container input").val("");
			this.$el.find(".choice-container annotation").text("value");

			this.$el.find(".freetext-container").show();
			this.$el.find(".choice-container").hide();

			this.trigger("build", string);
		},
		opClickHandler: function(event) {
			event.preventDefault();
			var target = $(event.target);
			var text = target.text();
			if(text == "no operator") {
				text = "op";
			}
			this.$el.find(".op-container .dropdown-label").text(text);

		},
		annotationClickHandler: function(event) {
			event.preventDefault();
			var target = $(event.target);
			var text = target.text();
			if(text == "") {
				text = "annotation";
				this.$el.find(".freetext-container").show();
				this.$el.find(".choice-container").hide();
			} else {
				if(target.data("values") == "freetext") {
					if(target.data("placeholder")) {
						this.$el.find(".freetext-container input").attr("placeholder", target.data("placeholder"));
					} else {
						this.$el.find(".freetext-container input").attr("placeholder", text);
					}
					this.$el.find(".freetext-container").show();
					this.$el.find(".choice-container").hide();
				} else {
					var values = target.data("values").split(",");
					this.$el.find(".choice-dropdown").html(this.annotationTemplate({values: values}));
					this.$el.find(".choice-container .dropdown-label").text("value");
					this.$el.find(".freetext-container").hide();
					this.$el.find(".choice-container").show();
				}
			}
			this.$el.find(".annotation-container .dropdown-label").text(text);


		},
		choiceClickHandler: function(event) {
			event.preventDefault();
			var target = $(event.target);
			this.$el.find(".choice-container .dropdown-label").text(target.text());
		}

	});
	return QueryBuilder;

});
