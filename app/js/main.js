require.config({
	urlArgs: "bust=" + (new Date()).getTime(), // TODO: stop server from caching, remove this before going live
	paths: {
		text:'lib/require.text'
	}
});

var app = {};
require([
		'views/MainMenu',
		'collections/AnnotationTypes',
		'models/Auth',
		'router'
],function(MainMenu,AnnotationTypes,Auth,Router) {
	app.router = new Router();
	app.annotationTypes = new AnnotationTypes();
	app.auth = new Auth();

	// TODO: uncomment ;) for global ajax errors
	// $(document).ajaxError(function( event, jqxhr, settings, exception ) {

	// 	if (settings.url == "ajax/missing.html") {
	// 		$( "div.log" ).text( "Triggered ajaxError handler." );
	// 	}
	// });

	var mainMenu = new MainMenu({router:app.router,el: $("#main-menu")});
	mainMenu.render();
	/*
	 * Working code, but disabled as CORS causes problems
	app.auth.save().success(function() {
		$.ajaxSetup({
			beforeSend: function (xhr)
			{
				xhr.setRequestHeader("Authorization",app.auth.get("token"));        
			}
		});
		app.annotationTypes.fetch().success(function() {
			Backbone.history.start();
		});
	});
   */

	app.annotationTypes.fetch().success(function() {
		Backbone.history.start();
	});

});
