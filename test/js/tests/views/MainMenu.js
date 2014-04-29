define(['views/MainMenu'],function(MainMenu) {
	describe("views/MainMenu", function () {
			it("should register render on route change", function () {
				// BUILD
				var Router = Backbone.Router.extend({
					routes: {
						"search":"search"
					},
					search: function() {}
				});
				var router = new Router();
				var routeSpy = sinon.spy(MainMenu.prototype, 'render');

				// TEST
				var menu = new MainMenu({router:router});
				router.trigger("route");
				expect(routeSpy.called).to.be.true;

				// CLEANUP
				MainMenu.prototype.render.restore()
			});
			/*
			it("should register render on router route event", function () {
				var router = new Router();
				var menu = new MainMenu({router:router});
				var spy = sinon.spy(menu,"render");
				router.trigger("route","search");
				expect(spy.called).to.be.true;
			});
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
