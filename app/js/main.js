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
		'router',
		'views/Messenger'
],function(MainMenu,AnnotationTypes,Auth,Router,Messenger) {
	app.router = new Router();
	app.annotationTypes = new AnnotationTypes();
	app.auth = new Auth();
	app.messenger = new Messenger();
	app.messenger.setElement($("body"));
		app.messenger.warning("Hej");

	$(document).ajaxError(function( event, jqxhr, settings, exception ) {
		app.messenger.warning("Error when requesting " + settings.url + " please reload the page.");
	});

	var mainMenu = new MainMenu({router:app.router,el: $("#main-menu")});
	mainMenu.render();

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


});
