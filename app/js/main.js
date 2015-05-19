require.config({
	paths: {
		text:'lib/require.text',
		moment: 'lib/moment.min'
	}
});
var app = {};

app.BASE_URL = "/api/";

require([
		'views/MainMenu',
		'views/authModal/AuthModal',
		'collections/AnnotationTypes',
		'collections/ProcessStatuses',
		'collections/sysadmin/GenomeReleaseFiles',
		'models/Auth',
		'router',
		'views/Messenger'
],function(MainMenu, 
           AuthModal, 
           AnnotationTypes, 
           ProcessStatuses, 
           GenomeReleaseFiles, 
           Auth, 
           Router, 
           Messenger) {

	app.router = new Router();
	app.annotationTypes = new AnnotationTypes();
	app.genomeReleaseFiles = new GenomeReleaseFiles();
	app.processStatuses = new ProcessStatuses();
	app.auth = new Auth();
	app.messenger = new Messenger();

//	$.ajaxSetup({ cache: false });

	$(document).ajaxError(function( event, jqxhr, settings, exception ) {
		
		if(jqxhr.responseJSON && jqxhr.responseJSON.message) {
			app.messenger.warning(jqxhr.responseJSON.message);
		} else {
			app.messenger.warning("Unexpected error: \"" + jqxhr.status + "\" when requesting " + settings.url + " please reload the page." + exception);
			
		}
	});

	var mainMenu = new MainMenu({router:app.router,el: $("#main-menu")});
	mainMenu.render();
	

	var postLogin = function() {
		var postFetch = _.after(2, function() {
			Backbone.history.start();
		});
		app.genomeReleaseFiles.fetch().success(postFetch);
		app.annotationTypes.fetch().success(postFetch);
	};

    /* NEW: Logged in if received token from server */
	if(app.auth.isLoggedIn()) {
		postLogin();
	} else {
		var authModal = new AuthModal({model:app.auth});
		authModal.show();
		app.auth.once('loggedIn',postLogin);
	}
});
