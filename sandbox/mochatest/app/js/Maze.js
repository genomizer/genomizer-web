define(['HashSet', 'Position'], function (HashSet, Position) {
    return Backbone.Model.extend({

        initialize: function (string) {

            this.movablePositions = new HashSet();
            this.goalPositions = new HashSet();

            var lines = string.split('\n');
            for (var y = 0; y < lines.length; y++) {
                var line = lines[y];
                for (var x = 0; x < line.length; x++) {
                    var pos = new Position({'x': x, 'y': y});
                    switch (line.charAt(x)) {
                        case 'S':
                            if (this.start == undefined) {
                                this.start = pos;
                                this.movablePositions.add(pos);
                            } else {
                                throw "Maze cannot have multiple start positions";
                            }
                            break;
                        case 'G':
                            this.goalPositions.add(pos);
                        case ' ':
                            this.movablePositions.add(pos);
                            break;
                        case '*':
                            break;
                        default:
                            throw "Invalid char in maze";
                    }
                }
            }
            if (this.start == undefined) {
                throw "Maze must have start position";
            }
        },

        isGoal: function (pos) {
            return this.goalPositions.contains(pos);
        },

        isMovable: function (pos) {
            return this.movablePositions.contains(pos);
        },

        getStartPosition: function () {
            return this.start;
        }
    });
});