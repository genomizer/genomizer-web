define(['Position'], function (Position) {
    describe("models/PositionTest", function () {
        var position;
        beforeEach(function () {
            position = new Position({"x": 1, "y": 2});
        });
        it("shouldExist", function () {
            expect(position).to.exist;
        });
        it("shouldReturnCorrectXValue", function () {
            expect(position.getX()).to.equal(1);
        });
        it("shouldReturnCorrectXValue", function () {
            expect(position.getY()).to.equal(2);
        });
        describe("models/PositionTest/equalsTests", function () {
            it("shouldBeEqualToSelf", function () {
                expect(position.equals(position)).to.be.true;
            });
            it("shouldBeEqualToPositionWithSameXY", function () {
                var otherPosition = new Position({'x': 1, 'y': 2});
                expect(position.equals(otherPosition)).to.be.true;
            });
            it("shouldNotBeEqualToPositionWithDifferentX", function () {
                var otherPosition = new Position({'x': 2, 'y': 2});
                expect(position.equals(otherPosition)).to.be.not.true;
            });
            it("shouldNotBeEqualToPositionWithDifferentY", function () {
                var otherPosition = new Position({'x': 1, 'y': 3});
                expect(position.equals(otherPosition)).to.be.not.true;
            });
            it("shouldNotBeEqualToString", function () {
                expect(position.equals("hej")).to.be.not.true;
            });
            it("shouldNotBeEqualToUndefined", function () {
                expect(position.equals(undefined)).to.be.not.true;
            });
        });
        describe("models/PositionTest/hashCodeTests", function () {
            it("shouldHaveHashCodeOfTypeInt", function () {
                expect(typeof position.hashCode()).to.equal(typeof 1);
            });
            it("shouldHaveSameHashCodeAsPositionWithSameXY", function () {
                var otherPosition = new Position({'x': 1, 'y': 2});
                expect(position.hashCode()).to.equal(otherPosition.hashCode());
            });
        });
        describe("models/PositionTest/adjacentPositionTests", function () {
            it("shouldHaveCorrectValuesForGetPosToNorth", function () {
                var otherPosition = new Position({'x': 1, 'y': 1});
                expect(position.getPosToNorth().equals(otherPosition)).to.be.true;
            });
            it("shouldHaveCorrectValuesForGetPosToSouth", function () {
                var otherPosition = new Position({'x': 1, 'y': 3});
                expect(position.getPosToSouth().equals(otherPosition)).to.be.true;
            });
            it("shouldHaveCorrectValuesForGetPosToEast", function () {
                var otherPosition = new Position({'x': 2, 'y': 2});
                expect(position.getPosToEast().equals(otherPosition)).to.be.true;
            });
            it("shouldHaveCorrectValuesForGetPosToWest", function () {
                var otherPosition = new Position({'x': 0, 'y': 2});
                expect(position.getPosToWest().equals(otherPosition)).to.be.true;
            });
        });
    });
});
