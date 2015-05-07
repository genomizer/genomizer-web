define(['Dummy'], function () {
    describe("Test name", function () {
        it("test failing", function () {

            var todo = new Todo();
            expect(todo).to.not.exist;
        });
        it("test succeeding", function () {

            var todo = new Todo();
            expect(todo).to.exist;
        });
        it("test succeeding", function () {

            var todo = new Todo();
        });
    });
});
