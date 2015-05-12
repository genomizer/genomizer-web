define([],function() {
	var Auth = Backbone.Model.extend({
		url: function() {
			return  app.BASE_URL + 'login';
		},

		initialize: function() {

            /* NEW: Check if we already have a token (HTML5 localStorage) */
			var token = localStorage.getItem('authToken');
			if(token) {

                /* NEW: Store token in Backbone */
				this.set('token',token);
				this._afterLogin();
			}

			$(document).ajaxError(function( event, jqxhr, settings, exception ) {
				// Show login window if token expires
				// TODO: shoud we really reload asap?
				if(jqxhr.status == 401) {
					localStorage.clear()
					window.location.href = '';
				}
			});

		},
		idAttribute:'token',

        /* Called from AuthModal.js on submission */
		doLogin: function() {
			var that = this;

            /* NEW:
             * Sends form data to DB and on success (200) 
             * stores token in localStorage
             */
			return this.save().success(function() {
				localStorage.setItem('authToken',that.get('token'));
				that._afterLogin();
			});
		},

		_afterLogin: function() {
			$.ajaxSetup({
				beforeSend: function (xhr)
				{
					xhr.setRequestHeader("Authorization",app.auth.get("token"));    
				}
			});
			this.trigger("loggedIn");
		},

		isLoggedIn: function() {
			return this.get('token') !== undefined
		},

		logout: function() {
			localStorage.clear()
			return this.destroy().success(function() {
				window.location.href = '';
			});
		}
	});
	return Auth;
});

