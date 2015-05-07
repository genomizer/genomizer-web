define([], function () {
    return Backbone.Model.extend({

        initialize: function () {
            this.elemCount = 0;
            this.elements = [];
        },

        rehash: function () {

        },

        add: function (elem) {
            this.validateElement(elem);
            if (!this.contains(elem)) {
                this.elements.push(elem);
                this.elemCount++;
            }
        },

        remove: function (elem) {
            this.validateElement(elem);
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].equals(elem)) {
                    this.elements.splice(i, 1);
                    this.elemCount--;
                    return;
                }
            }
        },

        contains: function (elem) {
            this.validateElement(elem);
            for (var i = 0; i < this.elements.length; i++) {
                if (this.elements[i].equals(elem)) {
                    return true;
                }
            }
            return false;
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