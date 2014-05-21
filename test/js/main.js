// Setup of test suites
var expect = chai.expect;
var should = chai.should();
mocha.setup("bdd");

requirejs.config({
    baseUrl: '../app/js',
	paths: {
        tests: '../../test/js/tests/',
		text:'lib/require.text',
		moment: 'lib/moment.min'
    }
});

var app = {};
app.BASE_URL = "http://scratchy.cs.umu.se:8000/api/"

require(testModulePaths,function() {
	mocha.run();
});

