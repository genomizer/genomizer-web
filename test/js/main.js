// Setup of test suites
var expect = chai.expect;
var should = chai.should();
mocha.setup("bdd");

requirejs.config({
    baseUrl: '../app/js',
	paths: {
        tests: '../../test/js/tests/',
		text:'lib/require.text'
    }
});

require(testModulePaths,function() {
	mocha.run();
});

