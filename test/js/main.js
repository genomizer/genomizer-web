// Setup of test suites
var expect = chai.expect;
mocha.setup("bdd");

requirejs.config({
    baseUrl: '../app/js',
	paths: {
        tests: '../../test/js/tests/'
    }
});

require(testModulePaths,function() {
	mocha.run();
});

