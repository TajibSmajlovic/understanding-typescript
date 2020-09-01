"use strict";
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("It works!");
    }, 1000);
    reject();
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
function countAndDescribe(element) {
    return [element, element.length ? element.length : "Got no value"];
}
function extractAndConvert(obj, key) {
    return "value" + obj[key];
}
class DataStorage {
    constructor(data = []) {
        this.data = data;
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1)
            return;
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
function createCourseGoal(title, description, completeUntil) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal;
}
const numbers = [1, "Leo"];
//# sourceMappingURL=generics.js.map