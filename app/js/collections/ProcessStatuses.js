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
		},
		startFetching: function() {
			var that = this;
			if(this.interval != undefined) {
				clearInterval(this.interval);
			}

			this.fetch();

			this.interval = setInterval(function() { that.fetch() }, 5000);

		},
		stopFetching: function() {
			if(this.interval != undefined) {
				clearInterval(this.timeout);
			}
		}
	});
	return ProcessStatuses;
});

