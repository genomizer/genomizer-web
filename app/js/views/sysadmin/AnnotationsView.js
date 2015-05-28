/**
 * A view class for the Annotations page showing the Create New Annotation
 * button and the search field which filters the collection
 */
define(['views/sysadmin/AnnotationListView', 
		'text!templates/sysadmin/AnnotationsViewTemplate.html', 
		'collections/sysadmin/Annotations'], 
function(AnnotationListView, annotationsViewTemplate, Annotations) {
	var AnnotationsView = Backbone.View.extend({

		render : function() {
			var template = _.template(annotationsViewTemplate);

			$('.activePage').html(template);
			var test = new Annotations();
			this.annotationsListView.render(new Annotations(), true);
			$('#search_field').focus();
			this.updateSearchList();
		},

		initialize : function() {
			var annotations = new Annotations();
			this.annotationsListView = new AnnotationListView(annotations);
			this.searchList = new Annotations();

			this.$el.find("#genomeReleases").removeClass("activeLink");
			this.$el.find("#annotation").addClass("activeLink");
			this.render();
		},

		events : {
			"click #search_button" : "search",
			"keyup #search_field" : "search",
		},
		
		updateSearchList: function() {
			this.searchList.fetch();
		},

		/**
		 * Takes an event e, if backspace is pressed - fetch a new list and 
		 * filter that, else - filter current list
		 * @param {Object} e - the triggered event
		 */ 
		 search : function(e) {
			var searchParam = $('#search_field').val();
			if (e.keyCode == 8) {
				//keyCode 8 = backspace
				var that = this;
				this.searchList.fetch().complete(function() {
					that.searchList.filterCollection(searchParam);
					that.annotationsListView.render(that.searchList, false);
				});
			} else {

				this.searchList.filterCollection(searchParam);
				this.annotationsListView.render(this.searchList, false);
			}
		},
	});
	return AnnotationsView;
});

