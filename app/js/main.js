require.config({
	urlArgs: "bust=" + (new Date()).getTime(), // TODO: stop server from caching, remove this before going live
	paths: {
		text:'lib/require.text'
	}
});


require([
		'collections/SearchResults',
		'models/Experiment',
		'collections/Experiments',
		'views/search/Search',
		'views/MainMenu',
		'router'
],function(SearchResults,Experiment,Experiments,Search,MainMenu,Router) {
	var router = new Router();

	var mainMenu = new MainMenu({router:router,el: $("#main-menu")});
	mainMenu.render();
	Backbone.history.start();

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
