"use strict";
function add(num1, num2, showResult = true, resultType = "as-number") {
    let result;
    if (typeof num1 === "number" && typeof num2 === "number")
        result = num1 + num2;
    else
        result = num1.toString() + num2.toString();
    if (resultType === "as-number")
        return +result;
    return showResult ? result : "No Result!";
}
let number1;
number1 = 7;
const number2 = 7;
const res = add(number1, number2);
console.log(res);
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["CUSTOMER"] = "CUSTOMER";
})(Role || (Role = {}));
const person = {
    name: "Hamid",
    age: 61,
    hobbies: ["Lezanje", "Besposlicarenje"],
    role: [1, Role.ADMIN],
};
console.log(person.name);
for (const hobby of person.hobbies) {
    console.log(hobby);
}
function myFunc(n1, n2) {
    return n1 + n2;
}
let addTwoNumbers;
addTwoNumbers = myFunc;
function withCallback(num1, num2, callback) {
    const result = num1 + num2;
    callback(result);
}
withCallback(10, 25, (res) => console.log(res));
function generateError(error, errorCode) {
    throw { error, errorCode };
}
console.log("test" + 123);
generateError("Error!", 500);
//# sourceMappingURL=old.js.map