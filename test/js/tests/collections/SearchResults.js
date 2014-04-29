define(['collections/SearchResults'],function(SearchResults) {

	describe("Testing SearchResults", function () {
			var requests;
			beforeEach(function () {
    				xhr = sinon.useFakeXMLHttpRequest();
    				requests = [];
				xhr.onCreate = function (req) { requests.push(req); };
			});
			afterEach(function () {
				// Like before we must clean up when tampering with globals.
				xhr.restore();
			});
			describe("should fetch with correct URL when query is supplied as option",function() {
				it("regular string", function () {
					var searchResults = new SearchResults([],{query:"male[sex]"});
					expect(requests[0].url).to.equal('/api/search?q=male[sex]');
				});
				it("string with spaces", function () {
					var searchResults = new SearchResults([],{query:"male[sex] AND specie[cat]"});
					expect(requests[0].url).to.equal('/api/search?q=male[sex] AND specie[cat]');
				});
			});
	});
});
