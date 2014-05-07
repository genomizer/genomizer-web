define([],function() {
	var Router = Backbone.Router.extend({

		routes: {
			"search/:query": "search",
			"search": "search",
			"upload":"upload",
			"process":"process",
			"admin":"admin", 
		},

		initialize: function(options) {
			this.history = [];
			this.on("all", this.storeRoute);
		},

		storeRoute: function() {
			this.history.push(Backbone.history.fragment);
		},

		previous: function(options) {
			if (this.history.length > 1) {
				if(options) {
					this.navigate(this.history.pop(), options);
				} else {
					this.navigate(this.history.pop());
				}
				
			}
		},

		search: function(query) {
			var that = this;
			require([
				'views/search/Search'
			],function(Search) {
				new Search({el:that.getNewMainView(),query:query});
			});
		},

		upload: function() {
			var that = this;
			require([
				'views/upload/Upload'
			],function(Upload) {
				new Upload({el:that.getNewMainView()});
			});
		},

		process: function() {
			require([
				'views/processModal/Process'
			],function(Process) {
				var modal = new Process();
				modal.show();
			});
		},
		getNewMainView: function() {
			$("#mainView").replaceWith('<section id=mainView></section>');
			return $("#mainView");
		},
		
		admin: function() {
			var that = this;
			require([
				'views/sysadmin/SysadminMainView',
				'views/sysadmin/AnnotationsView'
			],function(SysadminMainView, AnnotationsView) {
				new SysadminMainView({el:that.getNewMainView()});
				new AnnotationsView({el:that.getNewMainView()});
			});
		}
		
		

	});
	return Router;
});
