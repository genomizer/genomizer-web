define(['RightHandRuleRobot', 'MemoryRobot', 'Maze'],
    function (RightHandRuleRobot, MemoryRobot, Maze) {
        describe("models/RobotTest", function () {
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
            describe("models/RHRRTest", function () {
                it("shouldCompleteGivenMaze", function () {
                    var robot = new RightHandRuleRobot(maze);

                    var i;
                    for (i = 0; i < 100; i++) {
                        if (!robot.hasReachedGoal()) {
                            robot.move();
                        } else {
                            break;
                        }
                    }
                    expect(robot.hasReachedGoal()).to.be.true;
                });
            });
            describe("models/MemoryRobotTest", function () {
                it("shouldCompleteGivenMaze", function () {
                    var robot = new MemoryRobot(maze);

                    var i;
                    for (i = 0; i < 100; i++) {
                        if (!robot.hasReachedGoal()) {
                            robot.move();
                        } else {
                            break;
                        }
                    }
                    expect(robot.hasReachedGoal()).to.be.true;
                });
            });
        });
    });
