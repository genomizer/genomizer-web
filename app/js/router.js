/**
    Handles routes in the application and history handling
    for navigating through a single page application.
*/
define([],function() {
    var Router = Backbone.Router.extend({

        //Routes used by the application.
        routes: {
            "search/:query": "search",
            "search": "search",
            "": "search",
            "upload":"upload",
            "upload/:expIds": "upload",
            "process":"process",
            "process/:query":"process",
            "admin":"admin",
            "admin/createannotation": "createAnnotation",
            "admin/editannotation/:name": "editAnnotation",
            "admin/genomereleases" : "genomeReleases",
			"logout": "logout"
        },

        //init function.
        initialize: function(options) {
            this.history = [];
            this.on("route", this.storeRoute);
        },

        //Stores a page into the history stack.
        storeRoute: function(event, p2) {
            this.history.push(Backbone.history.fragment);
        },

        //Go back one page in the history using the stack.
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

        //returns true if there is a previous site false if not.
        hasPrevious: function() {
            return this.history.length > 2;
        },

        //Route to the search function.
        search: function(query) {
            var that = this;
            require([
                'views/search/Search'
            ],function(Search) {
                new Search({el:that.getNewMainView(),query:query});
            });
        },

        upload: function(expIds) {
            var that = this;
            require([
                'views/upload/Upload'
            ],function(Upload) {
                new Upload({el:that.getNewMainView(),expIds:expIds});
            });
        },

        process: function(query) {
            require([
                'views/processModal/Process'
            ],function(Process) {
                var modal = new Process({query:query});
                modal.show();
            });
        },
        getNewMainView: function() {
            $("#mainView").replaceWith('<section id=mainView></section>');
            return $("#mainView");
        },
        
        getNewAdminView: function() {
        	$(".activePage").remove();
        	$("#mainView").append('<div class=activePage></div>');
        	return $("#mainView");
        },
        
        admin: function() {
            var that = this;
            require([
                'views/sysadmin/SysadminMainView',
                'views/sysadmin/AnnotationsView'
            ],function(SysadminMainView, AnnotationsView) {
                new SysadminMainView({el:that.getNewMainView()});
                new AnnotationsView({el:that.getNewAdminView()});
            });
        },
        
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

        //Logout function.
		logout: function() {
			app.auth.logout();
		}

    });
    return Router;
});


