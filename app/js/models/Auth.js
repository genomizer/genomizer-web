define([],function() {
	var Auth = Backbone.Model.extend({
		url: function() {
			return  app.BASE_URL + 'login';
		},
		initialize: function() {
			var token = localStorage.getItem('authToken');
			if(token) {
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
		doLogin: function() {
			var that = this;
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

