define(['HashSet', 'Position'], function (HashSet, Position) {
    describe("models/HashSet", function () {
        var theSet;
        beforeEach(function () {
            theSet = new HashSet();
        });
        it("shouldExist", function () {
            expect(theSet).to.exist;
        });
        describe("models/HashSet/sizeTests", function () {
            it("shouldBeEmpty", function () {
                expect(theSet.size()).to.equal(0);
            });
            it("shouldHaveSize1After1Add", function () {
                theSet.add(new Position());
                expect(theSet.size()).to.equal(1);
            });
            it("shouldHaveSize2After2Adds", function () {
                theSet.add(new Position({'x': 1, 'y': 2}));
                theSet.add(new Position({'x': 1, 'y': 3}));
                expect(theSet.size()).to.equal(2);
            });
            it("shouldHaveSize1After2AddsAnd1Remove", function () {
                var pos1 = new Position({'x': 1, 'y': 2});
                theSet.add(pos1);
                theSet.add(new Position({'x': 1, 'y': 3}));
                theSet.remove(pos1);
                expect(theSet.size()).to.equal(1);
            });
            it("shouldHaveSize1After2EqualAdds", function () {
                theSet.add(new Position({'x': 1, 'y': 2}));
                theSet.add(new Position({'x': 1, 'y': 2}));
                expect(theSet.size()).to.equal(1);
            });
        });
        describe("models/HashSet/validationTests", function () {
            it("positionShouldBeValid", function () {
                theSet.add(new Position({'x': 1, 'y': 2}));
            });
            it("shouldNotBeValidWhenUndefined", function () {
                expect(theSet.add.bind(theSet, undefined)).to.throw("Invalid element");
            });
            it("shouldNotBeValidWhenEqualsUndefined", function () {
                var noEquals = Backbone.Model.extend({
                    hashCode: function () {
                        return 1;
                    }
                });
                expect(theSet.add.bind(theSet, noEquals)).to.throw("Invalid element");
            });
            it("shouldNotBeValidWhenHashCodeUndefined", function () {
                var noEquals = Backbone.Model.extend({
                    equals: function () {
                        return false;
                    }
                });
                expect(theSet.add.bind(theSet, noEquals)).to.throw("Invalid element");
            });
        });
        describe("models/HashSet/containsTests", function () {
            it("emptySetShouldNotContainPosition", function () {
                expect(theSet.contains(new Position({'x': 1, 'y': 2}))).to.be.false;
            });
            it("setShouldContainPositionAfterAddition", function () {
                var pos1 = new Position({'x': 1, 'y': 2});
                theSet.add(pos1);
                expect(theSet.contains(pos1)).to.be.true;
            });
            it("setShouldNotContainPositionAfterAdditionOfDifferentPosition", function () {
                var pos1 = new Position({'x': 1, 'y': 2});
                var pos2 = new Position({'x': 1, 'y': 3});
                theSet.add(pos1);
                expect(theSet.contains(pos2)).to.be.false;
            });
            it("setShouldContainBothPositions", function () {
                var pos1 = new Position({'x': 1, 'y': 2});
                var pos2 = new Position({'x': 1, 'y': 3});
                theSet.add(pos1);
                theSet.add(pos2);
                expect(theSet.contains(pos1)).to.be.true;
                expect(theSet.contains(pos2)).to.be.true;
            });
            it("setShouldNotContainPositionAfterRemoval", function () {
                var pos = new Position({'x': 1, 'y': 2});
                theSet.add(pos);
                theSet.remove(pos);
                expect(theSet.contains(pos)).to.be.false;
            });
            it("setShouldContainOnePositionAfterRemovalOfOther", function () {
                var pos1 = new Position({'x': 1, 'y': 2});
                var pos2 = new Position({'x': 1, 'y': 3});
                theSet.add(pos1);
                theSet.add(pos2);
                theSet.remove(pos2);
                expect(theSet.contains(pos1)).to.be.true;
                expect(theSet.contains(pos2)).to.be.false;
            });
        });
    });
});
