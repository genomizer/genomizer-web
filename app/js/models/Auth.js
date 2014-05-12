define([],function() {
	var Auth = Backbone.Model.extend({
		defaults : {
			username: "Genome researcher 1",
			password: "superhemligt"
		},
		url: function() {
			return  app.BASE_URL + 'login';
		},
		initialize: function() {

		}
	});
	return Auth;
});

