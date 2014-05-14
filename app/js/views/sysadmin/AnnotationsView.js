define(['views/sysadmin/AnnotationListView', 'text!templates/sysadmin/AnnotationsViewTemplate.html', 'collections/sysadmin/Annotations'], function(AnnotationListView, annotationsViewTemplate, Annotations) {
	var AnnotationsView = Backbone.View.extend({

		render : function() {
			var template = _.template(annotationsViewTemplate);

			$('.activePage').html(template);
			var test = new Annotations();
			this.annotationsListView.render(new Annotations(), true);
		},

		initialize : function() {
			var annotations = new Annotations();
			this.annotationsListView = new AnnotationListView(annotations);
			this.render();
			this.searchList = new Annotations();
		},

		events : {
			"click #search_button" : "search",
			"keyup #search_field" : "search",
			"focus #search_field" : "updateSearchList"
		},

		search : function(e) {
			var searchParam = $('#search_field').val();
			if(e.keyCode == 8){
				//backspace
				var that = this;
				this.searchList.fetch().complete(function(){
					that.searchList.filterCollection(searchParam);
					that.annotationsListView.render(that.searchList, false);					
				});
			} else{
				
				this.searchList.filterCollection(searchParam);
				this.annotationsListView.render(this.searchList, false);
			}
		},
		
		updateSearchList : function(e){
			this.searchList.fetch();
		}
	});
	return AnnotationsView;
});

