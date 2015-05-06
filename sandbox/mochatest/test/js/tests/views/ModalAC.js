define(['views/ModalAC'],function(ModalAC) {
	describe("views/ModalAC", function () {
			it("should render the child when show is called'", function () {
				var renderSpy = sinon.spy();
				var Modal = ModalAC.extend({
					render: renderSpy
				});
				var modal = new Modal();

				modal.$modal.modal
				modal.show();

				expect(renderSpy.called).to.be.true

				modal.hide();
			});
			/*
			it("should remove the modal from DOM when hiding'", function () {
				var renderSpy = sinon.spy();
				var Modal = ModalAC.extend({
					render: renderSpy
				});
				var modal = new Modal();

				modal.show();
				var modalRemoveSpy = sinon.spy(modal.$modal,'remove')
				modal.hide();

				expect(modalRemoveSpy.called).to.be.true
			});
		   */
	});
});
