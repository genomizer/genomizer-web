define(['collections/Files','models/Experiment','models/File'], function(Files,Experiment,File) {
	describe("models/File", function() {
		describe("should initialize correctly", function() {
			var file;
			beforeEach(function() {
				file = new File();
			});
			it("no options supplied", function() {
				expect(file.progress).to.equal(0);
			});
			it("Should initialize with raw as default type", function() {
				expect(file.get("type")).to.equal("raw");
			});
		});
		describe("should be able to set upload done", function() {
			var file;
			beforeEach(function() {
				file = new File();
			});
			it("uploadDone to equal true", function() {
				file.setUploadDone();
				expect(file.uploadDone).to.be.true;
			});
			it("progress to equal 1", function() {
				file.setUploadDone();
				expect(file.progress).to.equal(1);
			});
			it("triggers upload progress done", function() {
				var callback = sinon.spy();	
				file.on("uploadProgress",callback);
				file.setUploadDone();
				expect(callback.calledOnce).to.be.true;
			});
		});
		describe("should be able to set upload progress", function() {
			var file;
			var evt;
			beforeEach(function() {
				file = new File();
				evt = new Event("ProgressEvent");
			});
			it("progress is 0.5", function() {
				evt.lengthComputable = true;
				evt.loaded = 1;
				evt.total = 2;
				file.setUploadProgress(evt);
				expect(file.progress).to.equal(0.5);
			});
			it("lengh not computable", function() {
				evt.lengthComputable = false;
				evt.loaded = 1;
				evt.total = 2;
				file.setUploadProgress(evt);
				expect(file.progress).to.equal(0);
			});
			it("triggers upload progress", function() {
				evt.lengthComputable = true;
				evt.loaded = 1;
				evt.total = 2;
				var callback = sinon.spy();	
				file.on("uploadProgress",callback);
				file.setUploadProgress(evt);
				expect(callback.calledOnce).to.be.true;
			});
		});
		describe("should display correct byte prefixing", function() {
			var file;
			beforeEach(function() {
				file = new File();
				file.fileObj = {};
			});
			it("bytes", function() {
				file.fileObj.size = 322;
				expect(file.getReadableFileSize()).to.equal("322.00 B");
			});
			it("kilobytes", function() {
				file.fileObj.size = 1337;
				expect(file.getReadableFileSize()).to.equal("1.31 KiB");
			});
			it("megabytes", function() {
				file.fileObj.size = 1073741823;
				expect(file.getReadableFileSize()).to.equal("1024.00 MiB");
			});
			it("gigabytes", function() {
				file.fileObj.size = 1073741824;
				expect(file.getReadableFileSize()).to.equal("1.00 GiB");
			});
			it("terabytes", function() {
				file.fileObj.size = 14700470463365.12;
				expect(file.getReadableFileSize()).to.equal("13.37 TiB");
			});
		});
		describe("should be able to uploadFile", function() {
			var file;
			var server;
			it("should use URLupload", function() {
				// SET UP
				server = sinon.fakeServer.create();
				server.respondWith("http://example.se",[201, {"Content-Type": "text/html"},""]);
				file = new File({URLupload:"http://example.se"});
				var called = false;

				// TEST
				file.on("uploadProgress",function() {
					   called = true;
					   expect(file.progress).to.be.true;
					   expect(file.uploadDone).to.equal(1);
				});
				file.uploadFile()
				server.respond();
				expect(called).to.be.true;


				// RESTORE
				server.restore();
				
			});
		});
	});
});
