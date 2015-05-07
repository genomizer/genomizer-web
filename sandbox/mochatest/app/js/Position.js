define([], function () {
    var Position = Backbone.Model.extend({

        getX: function () {
            return this.get('x');
        },
        getY: function () {
            return this.get('y');
        },
        equals: function (other) {
            if (other === undefined) {
                return false;
            } else if (other == this) {
                return false;
            } else if (typeof this != typeof other) {
                return false;
            } else if (this.get('x') != other.get('x') || this.get('y') != other.get('y')) {
                return false;
            }
            return true;
        },
        toString: function () {
            return '(' + this.get('x') + ',' + this.get('y') + ')';
        },
        hashCode: function () {
            return this.get('x') * 31 + this.get('y');
        },
        getPosToNorth: function () {
            return new Position({'x': this.get('x'), 'y': this.get('y') - 1});
        },
        getPosToSouth: function () {
            return new Position({'x': this.get('x'), 'y': this.get('y') + 1});
        },
        getPosToEast: function () {
            return new Position({'x': this.get('x') + 1, 'y': this.get('y')});
        },
        getPosToWest: function () {
            return new Position({'x': this.get('x') - 1, 'y': this.get('y')});
        }
    });
    return Position;
});