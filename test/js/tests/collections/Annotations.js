define(['collections/sysadmin/Annotations', 'models/sysadmin/Annotation'], function(Annotations, Annotation) {
	describe("collections/sysadmin/Annotations", function() {
		it("Should exist after created", function() {
			var annotations = new Annotations();
			annotations.should.exist
		});
		describe("Tests of getByName", function (){
				it("Should retrieve correct annotation when using getByName", function() {
				var annotation1 = new Annotation({
					"name" : 'A1'
				});
				var annotation2 = new Annotation({
					"name" : 'A2'
				});
				var annotation3 = new Annotation({
					"name" : 'A3'
				});
				var annotation4 = new Annotation({
					"name" : 'A4'
				});
	
				var annotations = new Annotations([annotation1, annotation2, annotation3, annotation4]);
	
				var result = annotations.getAnnotationByName('A3');
				result.get('name').should.equal('A3');
				result = annotations.getAnnotationByName('A1');
				result.get('name').should.equal('A1');
				result = annotations.getAnnotationByName('A4');
				result.get('name').should.equal('A4');
				result = annotations.getAnnotationByName('A2');
				result.get('name').should.equal('A2');
			});
			it("Should return null when getByName does not find the annotation", function() {
				var annotation1 = new Annotation({
					"name" : 'A1'
				});
				var annotation2 = new Annotation({
					"name" : 'A2'
				});
				var annotation3 = new Annotation({
					"name" : 'A3'
				});
				var annotation4 = new Annotation({
					"name" : 'A4'
				});
	
				var annotations = new Annotations([annotation1, annotation2, annotation3, annotation4]);
	
				var result = annotations.getAnnotationByName('NotAvailableAnnotation');
				expect(result).to.be.null;
			});
			it("Should return find correct annotation when lowercase", function() {
				var annotation1 = new Annotation({
					"name" : 'A1'
				});
				var annotation2 = new Annotation({
					"name" : 'A2'
				});
				var annotation3 = new Annotation({
					"name" : 'A3'
				});
				var annotation4 = new Annotation({
					"name" : 'A4'
				});
	
				var annotations = new Annotations([annotation1, annotation2, annotation3, annotation4]);
	
				var result = annotations.getAnnotationByName('a2');
				result.get('name').should.equal('A2');
			});
		});
		
		describe("Tests of filterCollection", function (){
			it("Should filter the collection after input string, case sensitive, beginning of word", function() {
				var annotation1 = new Annotation({
					"name" : 'A1'
				});
				var annotation2 = new Annotation({
					"name" : 'A2'
				});
				var annotation3 = new Annotation({
					"name" : 'A3'
				});
				var annotation4 = new Annotation({
					"name" : 'A4'
				});
	
				var annotations = new Annotations([annotation1, annotation2, annotation3, annotation4]);
				annotations.filterCollection("A");
				annotations.length.should.equal(4);
			});
			it("Should filter the collection after input string, case insensitive, middle of word", function() {
				var annotation1 = new Annotation({
					"name" : 'PONGoieg ersog'
				});
				var annotation2 = new Annotation({
					"name" : 'MhosmbrspioseVebv rde fes'
				});
				var annotation3 = new Annotation({
					"name" : 'poiversfe5s68412fesakjnca'
				});
				var annotation4 = new Annotation({
					"name" : 'A4vrgrdshdrnh'
				});
	
				var annotations = new Annotations([annotation1, annotation2, annotation3, annotation4]);
				
				annotations.filterCollection("pIoS");
				annotations.length.should.equal(1);
				annotations.models[0].get('name').should.equal('MhosmbrspioseVebv rde fes');
			});
		});
		describe("Tests of findDeletedValues", function (){
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
			it("Should return -1 on no deleted annotations", function() {
			var originalString = "Human,Dog,Fly,Cat";
			var modifiedString = "Human,Dog,Fly,Cat, Horse";
			var originalArray = originalString.split(',');
			var modifiedArray = modifiedString.split(',');
			var deletedResult = Annotations.findDeletedValues(originalArray,modifiedArray);
			deletedResult.should.equal(-1);			
			});
		});
		describe("Tests of findAddedValues", function (){
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
			it("Should return -1 on no added annotations", function() {
				var originalString = "Human,Dog,Fly,Cat";
				var modifiedString = "Human,Dog";
				var originalArray = originalString.split(',');
				var modifiedArray = modifiedString.split(',');
				var addedResult = Annotations.findAddedValues(originalArray,modifiedArray);
				addedResult.should.equal(-1);		
			});
		});
		describe("Tests of findAddedValues and findDeletedValues", function (){
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

		});
		describe("Tests of getValuesOf", function (){
			it("Should find the values of the given annotation", function() {
				var annotation0 = new Annotation({
					"name" : 'Sex',
					"values" : ["Female","Dog","Male"]
				});
				var annotation1 = new Annotation({
					"name" : 'Species',
					"values" : ["Human","Dog","Cow","Turtle","Tortoise"]
				});
				var annotation2 = new Annotation({
					"name" : 'MhosmbrspioseVebv rde fes',
					"values" : []
				});
				var annotation3 = new Annotation({
					"name" : 'poiversfe5s68412fesakjnca',
					"values" : ["gesfes", "gfersd"]
				});
				var annotation4 = new Annotation({
					"name" : 'A4vrgrdshdrnh',
					"values" : ["niujgrds"]
				});
	
				var annotations = new Annotations([annotation0, annotation1, annotation2, annotation3, annotation4]);
				var result = annotations.getValuesOf('Species');
				result[0].should.equal("Human");
				result[1].should.equal("Dog");
				result[2].should.equal("Cow");
				result[3].should.equal("Turtle");
				result[4].should.equal("Tortoise");
				
				
			});
			it("Should NOT find the values of the given annotation", function() {
				var annotation0 = new Annotation({
					"name" : 'Sex',
					"values" : ["Female","Dog","Male"]
				});
				var annotation1 = new Annotation({
					"name" : 'species',
					"values" : ["Human","Dog","Cow","Turtle","Tortoise"]
				});
				var annotation2 = new Annotation({
					"name" : 'MhosmbrspioseVebv rde fes',
					"values" : []
				});
				var annotation3 = new Annotation({
					"name" : 'poiversfe5s68412fesakjnca',
					"values" : ["gesfes", "gfersd"]
				});
				var annotation4 = new Annotation({
					"name" : 'A4vrgrdshdrnh',
					"values" : ["niujgrds"]
				});
	
				var annotations = new Annotations([annotation0, annotation1, annotation2, annotation3, annotation4]);
				var result = annotations.getValuesOf('Speeechies');
				result.should.equal(-1);
				
				
			});

		});
	});
});

