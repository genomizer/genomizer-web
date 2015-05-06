define(['collections/AnnotationTypes'], function(AnnotationTypes) {
	describe("collections/AnnotationTypes", function() {
		beforeEach(function() {
			this.at = new AnnotationTypes(
				[
					{
						"id": 0,
						"name": "Development Stage",
						"values": [
							"freetext"
						],
						"forced": true
					},
					{
						"id": 1,
						"name": "ExpID",
						"values": [
							"freetext"
						],
						"forced": false
					},
					{
						"id": 2,
						"name": "FREETEXTTEST",
						"values": [
							"freetext"
						],
						"forced": true
					}
				]
			);
		});
		it('withoutExpID',function() {
			expect(this.at.withoutExpID().get(1)).to.be.undefined;
			expect(this.at.withoutExpID().get(0)).to.exist;
		});
		it('haveAttributes',function() {
			expect(this.at.get(0).get("name")).to.equal("Development Stage");
			expect(this.at.get(1).get("name")).to.equal("ExpID");
		});
	});
});
