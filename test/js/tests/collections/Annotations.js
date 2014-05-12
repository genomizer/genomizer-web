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
			result.length.should.equal(4);
		});
		it("Should find the deleted annotation values for strings", function() {
			var originalString = "Monkey,Donkey,Ape,Kong,Dong";
			var modifiedString = "Donkey,Kong";
			var originalArray = originalString.split(',');
			var modifiedArray = modifiedString.split(',');
			var result = Annotations.findDeletedValues(originalArray,modifiedArray);		
			expect($.inArray('Monkey', result)).to.not.equal(-1);
			expect($.inArray('Ape', result)).to.not.equal(-1);
			expect($.inArray('Dong', result)).to.not.equal(-1);
			expect($.inArray('Donkey', result)).to.equal(-1);
			expect($.inArray('Kong', result)).to.equal(-1);
		});
		it("Should find the deleted annotation values for integers", function() {
			var originalString = "1,Donkey,Ape,5,Dong";
			var modifiedString = "Donkey,1";
			var originalArray = originalString.split(',');
			var modifiedArray = modifiedString.split(',');
			var result = Annotations.findDeletedValues(originalArray,modifiedArray);		
			expect($.inArray('5', result)).to.not.equal(-1);
			expect($.inArray('Ape', result)).to.not.equal(-1);
			expect($.inArray('Dong', result)).to.not.equal(-1);
			expect($.inArray('1', result)).to.equal(-1);
			expect($.inArray('Donkey', result)).to.equal(-1);
		});
		it("Should find the added annotation values for strings", function() {
			var originalString = "Human,Dog,Fly,Cat";
			var modifiedString = "Human,Dog,Fly,Horse,Cat";
			var originalArray = originalString.split(',');
			var modifiedArray = modifiedString.split(',');
			var result = Annotations.findAddedValues(originalArray,modifiedArray);		
			expect($.inArray('Horse', result)).to.not.equal(-1);
			expect($.inArray('Human', result)).to.equal(-1);
			expect($.inArray('Dog', result)).to.equal(-1);
			expect($.inArray('Fly', result)).to.equal(-1);
			expect($.inArray('Cat', result)).to.equal(-1);
		});
		it("Should find the deleted and added annotation values for strings", function() {
			var originalString = "Human,Dog,Fly,Cat";
			var modifiedString = "Human,Dog,Horse,Cat";
			var originalArray = originalString.split(',');
			var modifiedArray = modifiedString.split(',');
			var deletedResult = Annotations.findDeletedValues(originalArray,modifiedArray);	
			var addedResult = Annotations.findAddedValues(originalArray,modifiedArray);		
			expect($.inArray('Fly', deletedResult)).to.not.equal(-1);
			expect($.inArray('Horse', addedResult)).to.not.equal(-1);
			deletedResult.length.should.equal(1);
			addedResult.length.should.equal(1);
		});
		it("Should return -1 on no deleted annotations", function() {
			var originalString = "Human,Dog,Fly,Cat";
			var modifiedString = "Human,Dog,Fly,Cat, Horse";
			var originalArray = originalString.split(',');
			var modifiedArray = modifiedString.split(',');
			var deletedResult = Annotations.findDeletedValues(originalArray,modifiedArray);
			deletedResult.should.equal(-1);			
		});
		it("Should return -1 on no added annotations", function() {
			var originalString = "Human,Dog,Fly,Cat";
			var modifiedString = "Human,Dog";
			var originalArray = originalString.split(',');
			var modifiedArray = modifiedString.split(',');
			var addedResult = Annotations.findAddedValues(originalArray,modifiedArray);
			addedResult.should.equal(-1);		
		});
	});
});

