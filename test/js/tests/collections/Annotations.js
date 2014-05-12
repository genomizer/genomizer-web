define(['collections/sysadmin/Annotations', 'models/sysadmin/Annotation'], function(Annotations, Annotation) {
	describe("collections/sysadmin/Annotations", function() {
		it("Should exist after created", function() {
			var annotations = new Annotations();
			annotations.should.exist
		});
		it("Should retrieve correct annotation when using getByID", function() {
			var annotation1 = new Annotation({
				"id" : '2',
				"name" : 'A1'
			});
			var annotation2 = new Annotation({
				"id" : '14',
				"name" : 'A2'
			});
			var annotation3 = new Annotation({
				"id" : '18',
				"name" : 'A3'
			});
			var annotation4 = new Annotation({
				"id" : '35',
				"name" : 'A4'
			});

			var annotations = new Annotations([annotation1, annotation2, annotation3, annotation4]);

			var result = annotations.getAnnotationByID('18');
			result.get('name').should.equal('A3');
			result = annotations.getAnnotationByID('2');
			result.get('name').should.equal('A1');
			result = annotations.getAnnotationByID('35');
			result.get('name').should.equal('A4');
			result = annotations.getAnnotationByID('14');
			result.get('name').should.equal('A2');
		});
		it("Should return null when getByID does not find the annotation", function() {
			var annotation1 = new Annotation({
				"id" : '2',
				"name" : 'A1'
			});
			var annotation2 = new Annotation({
				"id" : '14',
				"name" : 'A2'
			});
			var annotation3 = new Annotation({
				"id" : '18',
				"name" : 'A3'
			});
			var annotation4 = new Annotation({
				"id" : '35',
				"name" : 'A4'
			});

			var annotations = new Annotations([annotation1, annotation2, annotation3, annotation4]);

			var result = annotations.getAnnotationByID('128');
			expect(result).to.be.null;
		});
		it("Should filter the collection after input string", function() {
			var annotation1 = new Annotation({
				"id" : '2',
				"name" : 'A1'
			});
			var annotation2 = new Annotation({
				"id" : '14',
				"name" : 'A2'
			});
			var annotation3 = new Annotation({
				"id" : '18',
				"name" : 'A3'
			});
			var annotation4 = new Annotation({
				"id" : '35',
				"name" : 'A4'
			});

			var annotations = new Annotations([annotation1, annotation2, annotation3, annotation4]);
			
			var result = annotations.filterCollection("A");
			result.length.should.equal('4');
		});
	});
});

