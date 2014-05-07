define(['collections/SearchResults',
		'models/Experiment'],function(SearchResults, Experiment) {

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

		describe("Should select files correctly",function() {
			it("Should save a file ID if that file is checked in view, and deselect if it is not", function () {
				var testExperiment = new Experiment({
					"name": "experimentName",
					"created by": "user",
					"files": [{"id": "file-id1"}], "annotations": []
					});

				var searchResults = new SearchResults([],{query:undefined});
				searchResults.fileSelectHandler(testExperiment, "file-id1", true);
				expect(searchResults.selectedFiles.length).to.equal(1);
				expect(searchResults.selectedFiles[0].get("id")).to.equal('file-id1');
				searchResults.fileSelectHandler(testExperiment, "file-id1", false);
				expect(searchResults.selectedFiles.length).to.equal(0);
			});
			it("Should select the file given in the parameter", function () {
				var searchResults = new SearchResults([],{query:undefined});
				expect(searchResults.selectedFiles.length).to.equal(0);
				searchResults.selectFile('testFile');
				expect(searchResults.selectedFiles.length).to.equal(1);
				expect(searchResults.selectedFiles[0]).to.equal('testFile');
			});
			it("Should deselect all files when deselectFile is called", function () {
				var searchResults = new SearchResults([],{query:undefined});
				searchResults.selectFile('testFile');
				expect(searchResults.selectedFiles.length).to.equal(1);
				searchResults.deselectFile();
				expect(searchResults.selectedFiles.length).to.equal(0);
			});
			it("Should trigger highlightChange when a file is selected", function () {
				var searchResults = new SearchResults([],{query:undefined});
				var highlightSpy = sinon.spy();
				searchResults.on("highlightChange", highlightSpy);
				searchResults.selectFile('a');
				expect(highlightSpy.called).to.be.true;

			});
			it("Should trigger highlightChange when a file is deselected", function () {
				var searchResults = new SearchResults([],{query:undefined});
				var highlightSpy = sinon.spy();
				searchResults.on("highlightChange", highlightSpy);
				searchResults.deselectFile();
				expect(highlightSpy.called).to.be.true;

			});
			it("Should return selected files when getSelectedFiles is called", function () {
				var searchResults = new SearchResults([],{query:undefined});
				var files = searchResults.getSelectedFiles();
				expect(files.length).to.equal(0);

				searchResults.selectFile('testFile');
				files = searchResults.getSelectedFiles();
				expect(files[0]).to.equal('testFile');
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
