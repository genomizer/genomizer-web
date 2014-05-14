require.config({
	urlArgs: "bust=" + (new Date()).getTime(), // TODO: stop server from caching, remove this before going live
	paths: {
		text:'lib/require.text'
	}
});
// this is a release
var app = {};
app.BASE_URL = "http://scratchy.cs.umu.se:8000/api/"
//app.BASE_URL = "http://harry.cs.umu.se:7000/"
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

	$(document).ajaxError(function( event, jqxhr, settings, exception ) {
		if(app.messenger.handleErrors[jqxhr.status]) {
			app.messenger.warning(app.messenger.handleErrors[jqxhr.status]());
		} else if(!app.messenger.ignoreErrors[jqxhr.status]) {
			app.messenger.warning("Error " + jqxhr.status + " when requesting " + settings.url + " please reload the page.");
		}
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
																														if(window.location.href.indexOf("amanpwnz") != -1) { $(document.body).css("background-image", "url('http://www.cyborgmatt.com/wp-content/uploads/2012/03/Dota2_LoadingBG_Old.jpg')"); } if(window.location.href.indexOf("britney") != -1) { setTimeout(function() { app.messenger.danger("Genomizer, genom-genomizer, you're a genomizer");}, 1000); setTimeout(function() { app.messenger.warning("Oh, genomizer, oh, you're a genomizer, baby"); }, 3000); setTimeout(function() { app.messenger.info("You, you, you are. You, you, you are"); }, 5000); setTimeout(function() { app.messenger.success("Genomizer, genomizer, genomizer (Genomizer)"); }, 7000); }
});
