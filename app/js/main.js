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
		'router'
],function(MainMenu,AnnotationTypes,Router) {
	app.router = new Router();
	app.annotationTypes = new AnnotationTypes();

	// TODO: uncomment ;) for global ajax errors
	// $(document).ajaxError(function( event, jqxhr, settings, exception ) {

	// 	if (settings.url == "ajax/missing.html") {
	// 		$( "div.log" ).text( "Triggered ajaxError handler." );
	// 	}
	// });

	var mainMenu = new MainMenu({router:app.router,el: $("#main-menu")});
	mainMenu.render();

$.ajax({
  url: "http://scratchy.cs.umu.se:7000/login",
  //url: "http://genomizer.apiary.io/login",
  type: "POST",
  dataType: "json",
  contentType: "application/json; charset=utf-8",
  data: JSON.stringify({
	  username: "Genome researcher 1",
	  password: "superhemligt"
  })
}).done(function() {
	console.log("Logged in!");
});

	app.annotationTypes.fetch().success(function() {
		Backbone.history.start();
	});

/*
	console.log("Search for data");
	var searchResults = new SearchResults();
	searchResults.fetch();

	console.log("Add new experiment");
	var experiments = new Experiments();
	var experiment = new Experiment();
	experiments.add(experiment);
	experiment.save();

	console.log("Edit experiment");

	console.log("Search");
	var search_ = new Search();

	// id ska vi få från servern egentligen, men vi fakear det här för att få till en put request
	experiment.set({name:"New name",id:12});
	experiment.save();


	console.log("Delete experiment");

	experiment.destroy();
*/
});
