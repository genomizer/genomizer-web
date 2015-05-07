define(['Maze', 'Position'], function (Maze, Position) {
    describe("models/MazeTest", function () {
        describe("models/MazeTest/incorrectMazes", function () {
            it("shouldThrowWhenNoInput", function () {
                expect(function () {
                    new Maze();
                }).to.throw;
            });
            it("shouldThrowWhenWrongTypeOfInput", function () {
                expect(function () {
                    new Maze(1);
                }).to.throw;
            });
            it("shouldThrowWhenInvalidChar", function () {
                expect(function () {
                    new Maze("x");
                }).to.throw("Invalid char in maze");
            });
            it("shouldThrowWhenNoStart", function () {
                expect(function () {
                    new Maze("*G* ");
                }).to.throw("Maze must have start position");
            });
        });
        describe("models/MazeTest/correctMazes", function () {
            var maze;
            beforeEach(function () {
                maze = new Maze(
                    "*S**********\n" +
                    "*          *\n" +
                    "* ******** *\n" +
                    "*    *   * *\n" +
                    "*** ** * * *\n" +
                    "*      * * *\n" +
                    "********G***");
            });
            it("shouldBeDefined", function () {
                expect(maze).to.exist;
            });
            describe("models/MazeTest/startPositions", function () {
                it("shouldBeStartPosition", function () {
                    expect(maze.getStartPosition().equals(new Position({'x': 1, 'y': 0}))).to.be.true;
                });
                it("shouldNotBeStartPosition", function () {
                    expect(maze.getStartPosition().equals(new Position({'x': 1, 'y': 2}))).to.be.false;
                });
            });
            describe("models/MazeTest/goalPositions", function () {
                it("shouldNotBeGoalPosition", function () {
                    expect(maze.isGoal(new Position({'x': 8, 'y': 6}))).to.be.true;
                });
                it("shouldBeGoalPosition", function () {
                    expect(maze.isGoal(new Position({'x': 8, 'y': 7}))).to.be.false;
                });
            });
            describe("models/MazeTest/movablePositions", function () {
                it("shouldBeMovableGoalPosition", function () {
                    expect(maze.isMovable(new Position({'x': 8, 'y': 6}))).to.be.true;
                });
                it("shouldBeMovableStartPosition", function () {
                    expect(maze.isMovable(new Position({'x': 1, 'y': 0}))).to.be.true;
                });
                it("shouldBeMovableCorridorPosition", function () {
                    expect(maze.isMovable(new Position({'x': 1, 'y': 1}))).to.be.true;
                });
                it("shouldNotBeMovableWallPosition", function () {
                    expect(maze.isMovable(new Position({'x': 2, 'y': 2}))).to.be.false;
                });
                it("shouldNotBeMovableOutsidePosition1", function () {
                    expect(maze.isMovable(new Position({'x': -1, 'y': 0}))).to.be.false;
                });
                it("shouldNotBeMovableOutsidePosition2", function () {
                    expect(maze.isMovable(new Position({'x': 3, 'y': 8}))).to.be.false;
                });
                it("shouldNotBeMovableOutsidePosition3", function () {
                    expect(maze.isMovable(new Position({'x': 20, 'y': 5}))).to.be.false;
                });
            });
        });
    });
});
