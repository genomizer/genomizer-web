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
],function(MainMenu, AuthModal, AnnotationTypes, ProcessStatuses, GenomeReleaseFiles, Auth, Router, Messenger) {
	app.router = new Router();
	app.annotationTypes = new AnnotationTypes();
	app.genomeReleaseFiles = new GenomeReleaseFiles();
	app.processStatuses = new ProcessStatuses();
	app.auth = new Auth();
	app.messenger = new Messenger();

	$(document).ajaxError(function( event, jqxhr, settings, exception ) {
		
		if(jqxhr.responseJSON && jqxhr.responseJSON.message) {
			app.messenger.warning(jqxhr.responseJSON.message);
		} else {
			app.messenger.warning("Unexpected error: \"" + jqxhr.status + "\" when requesting " + settings.url + " please reload the page.");
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

	if(app.auth.isLoggedIn()) {
		postLogin();
	} else {
		var authModal = new AuthModal({model:app.auth});
		authModal.show();
		app.auth.once('loggedIn',postLogin);
	}
	
																														if(window.location.href.indexOf("amanpwnz") != -1) { $(document.body).css("background-image", "url('http://www.cyborgmatt.com/wp-content/uploads/2012/03/Dota2_LoadingBG_Old.jpg')"); } if(window.location.href.indexOf("amangingerpwnz") != -1) { $(document.body).css("background-image", "url('http://hydra-media.cursecdn.com/dota2.gamepedia.com/2/24/BladeAndBow.jpg?version=8bcbeb0cf5ad39fff9295f89dfe9ce4e')"); } if(window.location.href.indexOf("britney") != -1) { setTimeout(function() { app.messenger.danger("Genomizer, genom-genomizer, you're a genomizer");}, 1000); setTimeout(function() { app.messenger.warning("Oh, genomizer, oh, you're a genomizer, baby"); }, 3000); setTimeout(function() { app.messenger.info("You, you, you are. You, you, you are"); }, 5000); setTimeout(function() { app.messenger.success("Genomizer, genomizer, genomizer (Genomizer)"); }, 7000); }
});
