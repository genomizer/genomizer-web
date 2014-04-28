require.config({
	paths: {
		text:'lib/require.text'
	}
});


require([
		'collections/SearchResults',
		'models/Experiment',
		'collections/Experiments',
		'router'
],function(SearchResults,Experiment,Experiments,Router) {
	var router = new Router();

	console.log("aooo");
	Backbone.history.start();

	console.log("Search for data");
	var searchResults = new SearchResults();
	searchResults.fetch();

	console.log("Add new experiment");
	var experiments = new Experiments();
	var experiment = new Experiment();
	experiments.add(experiment);
	experiment.save();

	console.log("Edit experiment");

	// id ska vi få från servern egentligen, men vi fakear det här för att få till en put request
	experiment.set({name:"New name",id:12});
	experiment.save();


	console.log("Delete experiment");

	experiment.destroy();
});
