define(['models/sysadmin/Annotation'],function(Annotation) {
	describe("models/sysadmin/Annotation", function () {
			it("Should exist after created", function () {
				var annotation = new Annotation();
				annotation.should.exist;
			});
			it("Should have correct default values", function () {
				var annotation = new Annotation();
				annotation.get('id').should.equal('0');
				annotation.get('name').should.equal('Not specified');
				annotation.get('values').should.equal('Not specified');
				annotation.get('forced').should.equal('false');
			});
				it("Should have correct values after setting them", function () {
				var annotation = new Annotation();
				annotation.set({'id':'1'});
				annotation.set({'name':'Ape'});
				annotation.set({'values':'Monkey'});
				annotation.set({'forced':'true'});
				
				annotation.get('id').should.equal('1');
				annotation.get('name').should.equal('Ape');
				annotation.get('values').should.equal('Monkey');
				annotation.get('forced').should.equal('true');
			});

	});
});



  