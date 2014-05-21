define(['models/ProcessStatus'],function(ProcessStatus) {
	var ProcessStatuses = Backbone.Collection.extend({
		url: function() {
			return app.BASE_URL + 'process/';
		},
		model: ProcessStatus,
		initialize:function (options) {

		},
		comparator: function(process) {
			return -process.get("timeAdded");
		}
	});
	return ProcessStatuses;
});

