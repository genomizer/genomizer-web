define([
	'collections/SearchResults',
	'models/Experiment',
	'models/File'
],function(SearchResults, Experiment, File) {

	describe("Testing collections/SearchResults", function () {
		describe("should initialize correctly",function() {
			it("Should have an undefined query when initialized without a query", function () {
				var searchResults = new SearchResults([], {query:undefined});
				expect(searchResults.query).to.equal(undefined);
			});
			it("Should save the given query when initialized with a query", function () {
				var searchResults = new SearchResults([], {query:'test'});
				expect(searchResults.query).to.equal('test');
			});
			it("Should not be initialized with any files selected.", function () {
				var searchResults = new SearchResults([],{query:undefined});
				expect(searchResults.selectedFiles.length).to.equal(0);
			});
			it("Should run fileSelectHandler when fileSelect event is triggered", function () {
				var fileSelectHandlerSpy = sinon.spy(SearchResults.prototype, 'fileSelectHandler');
				var searchResults = new SearchResults([],{query:undefined});
				searchResults.trigger("fileSelect", new Experiment());
				expect(fileSelectHandlerSpy.called).to.be.true;
				SearchResults.prototype.fileSelectHandler.restore();
			});
		});

		describe("Testing file selection",function() {
			it("Should save a file ID if that file is checked in view, and deselect if it is not", function () {
				var file = new File({"id": "file-id1"});

				var searchResults = new SearchResults([],{query:undefined});
				searchResults.fileSelectHandler(file, true);
				expect(searchResults.selectedFiles.length).to.equal(1);
				expect(searchResults.isFileSelected("file-id1")).to.be.true;
				searchResults.fileSelectHandler(file, false);
				expect(searchResults.selectedFiles.length).to.equal(0);
			});
			it("Should select the file given in the parameter", function () {
				var searchResults = new SearchResults([],{query:undefined});
				var file = new File({"id": "file-id1"});
				expect(searchResults.selectedFiles.length).to.equal(0);
				searchResults.selectFile(file);
				expect(searchResults.selectedFiles.length).to.equal(1);
				expect(searchResults.isFileSelected(file)).to.be.true;
			});
			it("Should deselect all files when deselectFile is called", function () {
				var searchResults = new SearchResults([],{query:undefined});
				var file = new File({"id": "file-id1"});
				searchResults.selectFile(file);
				expect(searchResults.selectedFiles.length).to.equal(1);
				searchResults.deselectFile(file);
				expect(searchResults.selectedFiles.length).to.equal(0);
			});
			it("Should trigger highlightChange when a file is selected", function () {
				var searchResults = new SearchResults([],{query:undefined});
				var highlightSpy = sinon.spy();
				searchResults.on("highlightChange", highlightSpy);
				searchResults.selectFile(new File({"id": "file-id1"}));
				expect(highlightSpy.called).to.be.true;

			});
			it("Should trigger highlightChange when a file is deselected", function () {
				var searchResults = new SearchResults([],{query:undefined});
				var highlightSpy = sinon.spy();
				var file = new File({"id": "file-id1"});
				searchResults.selectFile(file);
				searchResults.on("highlightChange", highlightSpy);
				searchResults.deselectFile(file);
				expect(highlightSpy.called).to.be.true;

			});
			it("Should return selected files when getSelectedFiles is called", function () {
				var searchResults = new SearchResults([],{query:undefined});
				var files = searchResults.getSelectedFiles();
				var file = new File({"id": "file-id1"});
				expect(files.length).to.equal(0);

				searchResults.selectFile(file);
				files = searchResults.getSelectedFiles();
				expect(files.get("file-id1")).to.equal(file);
			});
			it("Should know if an experiment contains selected files", function () {
				var experiment = new Experiment({
					"name": "experimentName",
					"created by": "user",
					"files": [{"id": "file-id1"}], "annotations": []
				});
				var experiment2 = new Experiment({
					"name": "experimentName",
					"created by": "user",
					"files": [{"id": "file-id2"}], "annotations": []
				});
				var file = new File({"id": "file-id1"});

				var searchResults = new SearchResults([experiment, experiment2],{query:undefined});
				expect(searchResults.experimentHasSelectedFiles(experiment)).to.be.false;
				searchResults.selectFile(file);
				expect(searchResults.experimentHasSelectedFiles(experiment)).to.be.true;
				expect(searchResults.experimentHasSelectedFiles(experiment2)).to.be.false;
				searchResults.deselectFile(file);
				expect(searchResults.experimentHasSelectedFiles(experiment)).to.be.false;
			});
		});

		describe("Testing experiment selection",function() {
			it("Should know if an experiment is selected or not", function () {
				var experiment = new Experiment({
					"name": "experimentName",
					"created by": "user",
					"files": [{"id": "file-id1"}], "annotations": []
					});

				var searchResults = new SearchResults([],{query:undefined});
				searchResults.experimentSelectHandler(experiment, true);
				expect(searchResults.isExperimentSelected(experiment.cid)).to.be.true;
				searchResults.experimentSelectHandler(experiment, false);
				expect(searchResults.isExperimentSelected(experiment.cid)).to.be.false;
			});
			it("Should not break if the same experiment is selected twice", function () {
				
			});
			it("Should not break if an experiment that is not selected is deselected", function () {
				
			});
			it("Should trigger highlightChange when an experiment is selected", function () {
				

			});
			it("Should trigger highlightChange when an experiment is deselected", function () {
				

			});
			it("Should return selected experiments", function () {
				
			});
			
		});

		describe("Should set query correctly",function() {
			it("Should change query on call to setSearchQuery", function () {
				var searchResults = new SearchResults([], {query:undefined});
				searchResults.setSearchQuery("testQuery");
				expect(searchResults.query).to.equal("testQuery");
			});
			it("Should fetch new models when setting new query", function () {
				var fetchSpy = sinon.spy(SearchResults.prototype, 'fetchModels');
				var searchResults = new SearchResults([],{query:undefined});
				searchResults.setSearchQuery("testQuery");
				expect(fetchSpy.called).to.be.true;
				SearchResults.prototype.fetchModels.restore();
			});

		});
			
	});
});
