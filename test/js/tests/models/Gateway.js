define(['models/sysadmin/Gateway'],function(Gateway) {
	describe("models/sysadmin/Gateway", function () {
			it("Should exist after created", function () {
				var gateway = new Gateway();
				gateway.should.exist;
			});
			// it("Should return false sending a incorrect packet", function () {
				// var gateway = new Gateway();
				// gateway.createPacket("POST", "/annotation", )
			// });
	});
});



  