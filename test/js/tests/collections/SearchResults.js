define(['collections/SearchResults'],function(SearchResults) {

	describe("collections/SearchResults", function () {
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
					// DET HÄR TESTET ÄR RÄTT, API:et är fel! :D
					expect(requests[0].url).to.equal('http://genomizer.apiary.io/search/?annotations=male[sex]');
				});
				it("string with spaces", function () {
					var searchResults = new SearchResults([],{query:"male[sex] AND specie[cat]"});
					// DET HÄR TESTET ÄR RÄTT, API:et är fel! :D
					expect(requests[0].url).to.equal('http://genomizer.apiary.io/search/?annotations=male[sex] AND specie[cat]');
				});
			});
	});
});
