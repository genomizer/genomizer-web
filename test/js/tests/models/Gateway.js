define(['models/sysadmin/Gateway'],function(Gateway) {
	describe("models/sysadmin/Gateway", function () {
			it("Should exist after created", function () {
				var gateway = new Gateway();
				gateway.should.exist;
			});
	});
});



  