/* New
   TODO: Fix todos in code
	* Fix hardcoded Author
	* Implement ID.
*/
define([],function() {
	var RawToProfileInfo = Backbone.Model.extend({
		url: function() {
			return app.BASE_URL + 'process/rawtoprofile';
		},
		initialize: function() {

		},
		defaults: {
			/*TODO: FIX AUTHOR AND ID*/
			"author":"Kalle"
			//"id":"*987498p9ij8765gthyu86"
		}

	});
	return RawToProfileInfo;
});
