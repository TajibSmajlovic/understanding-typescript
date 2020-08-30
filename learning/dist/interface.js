"use strict";
let addFn = (n1, n2) => n1 + n2;
class Person {
    constructor(name) {
        if (name)
            this.name = name;
    }
    greed(word) {
        console.log(word + this.name);
    }
}
console.log(new Person());
//# sourceMappingURL=interface.js.map