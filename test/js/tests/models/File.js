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
		describe("getReadableFileSize", function() {
			var file;
			beforeEach(function() {
				file = new File();
			});
			it("should return undefined if no file", function() {
				expect(file.getReadableFileSize()).to.be.undefined;
			});
		});
		describe("getFileSize", function() {
			var file;
			beforeEach(function() {
				file = new File();
			});
			it("should get fileSize if file exists",function() {
				file.fileObj = {};
				file.fileObj.size = 1337;
				expect(file.getFileSize()).to.equal(1337);
			});
			it("should return undefined if fileSize if file does not exist",function() {
				expect(file.getFileSize()).to.be.undefined;
			});
		});
		describe("isFileUpload", function() {
			var file;
			beforeEach(function() {
				file = new File();
			});
			it("isFileUpload",function() {
				file.fileObj = {};
				file.fileObj.size = 1337;
				expect(file.isFileUpload()).to.be.true;
			});
			it("isFileUpload",function() {
				expect(file.isFileUpload()).to.be.false;
			});
		});
	});
});
