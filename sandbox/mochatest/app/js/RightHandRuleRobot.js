define(['Maze', 'Direction'], function (Maze, Direction) {
    return Backbone.Model.extend({

        initialize: function (maze) {
            if (maze == undefined) {
                throw "Maze is undefined";
            }
            this.position = maze.getStartPosition();
            this.direction = "SOUTH";
            this.maze = maze;
        },

        hasReachedGoal: function () {
            return this.maze.isGoal(this.position);
        },

        getCurrentPosition: function () {
            return this.position;
        },

        getCurrentDirection: function () {
            return this.direction;
        },

        move: function () {
            var posToRight = Direction[this.direction].posToRight(this.position);
            if (this.maze.isMovable(posToRight)) {
                this.position = posToRight;
                this.direction = Direction[this.direction].toRight;
            } else {
                this.direction = Direction[this.direction].toLeft;
            }
        }
    });
});