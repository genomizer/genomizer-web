define([], function () {
    return Backbone.Model.extend({

        initialize: function () {
            this.elemCount = 0;
            this.vectorLen = 10;
            this.elements = [];
            this.removed = new Backbone.Model.extend();
        },

        rehash: function () {
            var oldVector = this.elements;
            var oldLen = this.vectorLen;
            this.vectorLen = this.vectorLen * 2;
            this.elements = [];
            for (var i = 0; i < oldLen; i++) {
                if (oldVector[i] != undefined && oldVector[i] !== this.removed) {
                    this.add(oldVector[i]);
                }
            }
        },

        add: function (elem) {
            this.validateElement(elem);
            if (this.elemCount > this.vectorLen / 2) {
                this.rehash();
            }

            var hash = elem.hashCode() % this.vectorLen;
            var pos = hash;

            while (this.elements[pos] != undefined && !elem.equals(this.elements[pos])) {
                pos = (pos + 1) % this.vectorLen;
                if (pos == hash) {
                    throw "Didn't find available slot";
                }
            }
            if (this.elements[pos] == undefined) {
                this.elemCount++;
            }
            this.elements[pos] = elem;
        },

        remove: function (elem) {
            this.validateElement(elem);

            var hash = elem.hashCode() % this.vectorLen;
            var pos = hash;

            while (this.elements[pos] != undefined && !elem.equals(this.elements[pos])) {
                pos = (pos + 1) % this.vectorLen;
                if (pos == hash) {
                    return;
                }
            }
            if (this.elements[pos] != undefined) {
                if (this.elements[(pos + 1) % this.vectorLen] == undefined) {
                    this.elements[pos] = undefined;
                } else {
                    this.elements[pos] = this.removed;
                }
                this.elemCount--;
            }
        },

        contains: function (elem) {
            this.validateElement(elem);

            var hash = elem.hashCode() % this.vectorLen;
            var pos = hash;

            while (this.elements[pos] != undefined && !elem.equals(this.elements[pos])) {
                pos = (pos + 1) % this.vectorLen;
                if (pos == hash) {
                    return false;
                }
            }
            return this.elements[pos] != undefined;
        },
        
        size: function () {
            return this.elemCount;
        },

        validateElement: function (element) {
            if (element === undefined || element.hashCode === undefined || element.equals === undefined) {
                throw "Invalid element";
            }
        }
    });
});