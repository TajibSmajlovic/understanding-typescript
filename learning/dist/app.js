"use strict";
var addFn = function (n1, n2) { return n1 + n2; };
var Person = (function () {
    function Person(name) {
        if (name)
            this.name = name;
    }
    Person.prototype.greed = function (word) {
        console.log(word + this.name);
    };
    return Person;
}());
console.log(new Person());
//# sourceMappingURL=app.js.map