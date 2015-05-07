define([], function () {
    return {
        "NORTH": {
            value: 1, toLeft: "WEST", toRight: "EAST",
            posToFront: function (pos) {
                return pos.getPosToNorth();
            },
            posToRight: function (pos) {
                return pos.getPosToEast();
            }
        },
        "EAST": {
            value: 2, toLeft: "NORTH", toRight: "SOUTH",
            posToFront: function (pos) {
                return pos.getPosToEast();
            },
            posToRight: function (pos) {
                return pos.getPosToSouth();
            }
        },
        "SOUTH": {
            value: 3, toLeft: "EAST", toRight: "WEST",
            posToFront: function (pos) {
                return pos.getPosToSouth();
            },
            posToRight: function (pos) {
                return pos.getPosToWest();
            }
        },
        "WEST": {
            value: 4, toLeft: "SOUTH", toRight: "NORTH",
            posToFront: function (pos) {
                return pos.getPosToWest();
            },
            posToRight: function (pos) {
                return pos.getPosToNorth();
            }
        }
    };
});
