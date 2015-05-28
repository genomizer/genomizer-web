/*
	NEW:
	Handles routes in the application and history handling
	for navigating through a single page application.
*/
define([],function() {
    /*NEW: Create a new Router object by extending Backbonejs Router.*/
    var Router = Backbone.Router.extend({

        routeParams: {},

        //Routes used by the application.
        routes: {
            "search/:query": "search",
            "search": "search",
            "": "search",
            "upload": "upload",
            "upload/:expIds": "upload",
            "process": "process",
            "process/:query": "process",
            "workspace": "workspace",
            "administration":"administration",
            "administration/createannotation": "createAnnotation",
            "administration/editannotation/:name": "editAnnotation",
            "administration/genomereleases" : "genomeReleases",
            "convert": "convert",
            "convert/:query": "convert",
			"logout": "logout"
        },

        /* init function, inits the history array */
        initialize: function(options) {
            this.history = [];
            this.on("route", this.storeRoute);
        },

        /*	
		NEW:
		StoreRoute function
		Pushes a route (Page) into the history.
	
	*/
        storeRoute: function(event, p2) {
            this.history.push(Backbone.history.fragment);
        },

        /*
		NEW:
		Previous Function
		Pops the current page from the history stack
		and gets the previous page from the history
		and then navigate to that page.
		
		Represents functionality to be able to navigate
		backwards in a single page application.

	*/
        previous: function(options) {
            if (this.history.length > 2) {

                // remove the current page from history
                this.history.pop();

                // get the previous page
                var previous = this.history[this.history.length-1];

                //navigate back to the previous page.
                this.navigate(previous, options);
            }
        },
    
    /*
        NEW:
        Gets a new mainView to insert into mainview tag in Index.html
    */
        getNewMainView: function() {
            $("#mainView").replaceWith('<section id=mainView></section>');
            return $("#mainView");
        },
        
    /*  
        NEW:
        Gets a new admin view.
    */
        getNewAdminView: function() {
            $(".activePage").remove();
            $("#mainView").append('<div class=activePage></div>');
            return $("#mainView");
        },

        /*	
		NEW:
		Function to get if it has been a previous page
		Will return true if the length is more than 2
		Will return false if the lenght is less than 2. 
	*/
        hasPrevious: function() {
            return this.history.length > 2;
        },

        /* 	
		NEW:
		Search function
		Used for getting the search view 
	*/
        search: function(query) {
            var that = this;
            require([
                'views/search/Search'
            ],function(Search) {
                new Search({el:that.getNewMainView(),query:query});
            });
        },
	
	/*	
		NEW:	
		Upload function
		Used for getting the upload view 
	*/
        upload: function(expIds) {
            var that = this;
            require([
                'views/upload/Upload'
            ],function(Upload) {
                new Upload({el:that.getNewMainView(),expIds:expIds});
            });
        },
	
	/*
		NEW:
		Process function
		Used for getting the Processview.
	*/
        process: function(query) {
            var router = this;
            require([
// <<<<<<< HEAD
//                 'views/processModal/Process'
//             ],function(Process) {
//                 var modal = new Process({query:query});
//                 modal.show();
// =======
                'views/process/Process',
                'views/process/NoExpProcess',
                'models/Experiment',
            ],function(Process, NoExpProcess, Experiment) {
                if (query == undefined) {
                    new NoExpProcess({
                        el:router.getNewMainView(),
                    });
                } else {
                    new Process({
                        el:router.getNewMainView(),
                        collection: app.processCommands,
                        model: new Experiment({expId: query})
                    });
                }
            });
        },

        workspace: function() {

        },
        
	/*
		NEW:
		Admin function that uses the sysadmin view.
	*/
        administration: function() {
            var that = this;
            require([
                'views/sysadmin/SysadminMainView',
                'views/sysadmin/AnnotationsView'
            ],function(SysadminMainView, AnnotationsView) {
                new SysadminMainView({el:that.getNewMainView()});
                new AnnotationsView({el:that.getNewAdminView()});
            });
        },
        
	/*	
		NEW:
		Gets the createAnnotation view using the sysadmin main view.
	
	*/
        createAnnotation: function() {
            var that = this;
            require([
            	'views/sysadmin/SysadminMainView',
                'views/sysadmin/NewAnnotationView'
            ],function(SysadminMainView, NewAnnotationView) {
            	new SysadminMainView({el:that.getNewMainView()});
                new NewAnnotationView({el:that.getNewAdminView()});
            });
        },
        
	/*	
		NEW:
		Gets the editAnnotation view using with the sysadmin main view.
	*/
        editAnnotation: function(name) {
            var that = this;
            require([
            	'views/sysadmin/SysadminMainView',
                'views/sysadmin/EditAnnotationView'
            ],function(SysadminMainView, EditAnnotationView) {
            	new SysadminMainView({el:that.getNewMainView()});
                new EditAnnotationView({el:that.getNewAdminView(), id:name});                
            });
        },
        
	/*	
		NEW:
		Gets the genomereleases page from with the sysadmin main view
	*/
        genomeReleases: function() {
            var that = this;
        	require([
        		'views/sysadmin/SysadminMainView',
                'views/sysadmin/GenomeReleaseView'
            ],function(SysadminMainView, GenomeReleaseView) {
            	new SysadminMainView({el:that.getNewMainView()});
                new GenomeReleaseView({el:that.getNewAdminView()});                
            });
        },
        
        convert: function(query) {
            var that = this;
            require([
                'views/convertModal/ConvertView'
            ],function(Convert) {
                new Convert({el:that.getNewMainView(), query:query});
            });
        },

        //Logout function.
    	logout: function() {
    		app.auth.logout();
    	}

    });
    //Finally return the Router object.
    return Router;
});


