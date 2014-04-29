// Setup of test suites
var expect = chai.expect;
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

