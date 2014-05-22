define([],function() {
	var Auth = Backbone.Model.extend({
		defaults : {
			username: "epicon",
			password: "umea@2014"
		},
		url: function() {
			return  app.BASE_URL + 'login';
		},
		initialize: function() {

		}
	});
	return Auth;
});

