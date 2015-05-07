define(['Maze', 'Position', 'HashSet'], function (Maze, Position, HashSet) {
    return Backbone.Model.extend({

        initialize: function (maze) {
            if (maze == undefined) {
                throw "Maze is undefined";
            }
            this.position = maze.getStartPosition();
            this.visitedPoisitons = new HashSet();
            this.visitedPoisitons.add(this.position);
            this.path = [];
            this.maze = maze;
        },

        hasReachedGoal: function () {
            return this.maze.isGoal(this.position);
        },

        getCurrentPosition: function () {
            return this.position;
        },

        getNeighbourPositions: function () {
            return [
                this.position.getPosToNorth(),
                this.position.getPosToSouth(),
                this.position.getPosToEast(),
                this.position.getPosToWest()
            ];
        },

        move: function () {
            var robot = this;
            var movableNeighbours = this.getNeighbourPositions().filter(function (pos) {
                return robot.maze.isMovable(pos) && !robot.visitedPoisitons.contains(pos);
            });

            if (movableNeighbours.length > 0) {
                this.path.push(this.position);
                this.position = movableNeighbours[0];
                this.visitedPoisitons.add(this.position);
            } else if (this.path.length > 0) {
                this.position = this.path.pop();
            } else {
                throw "Robot did not find goal";
            }
        }
    });
});