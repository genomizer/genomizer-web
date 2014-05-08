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
		},

		events : {
			"click #search_btn" : "search"
		},

		search : function(e) {
			var searchParam = $('#search_field').val();
			if (searchParam == "") {
				this.annotationsListView.render(new Annotations(), true);
			} else {
				this.annotationsListView.render(this.annotationsListView.filter(searchParam), false);
			}
		}
	});
	return AnnotationsView;
});

