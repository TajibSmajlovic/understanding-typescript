function add(num1, num2, showResult, resultType) {
    if (showResult === void 0) { showResult = true; }
    if (resultType === void 0) { resultType = "as-number"; }
    var result;
    if (typeof num1 === "number" && typeof num2 === "number")
        result = num1 + num2;
    else
        result = num1.toString() + num2.toString();
    return showResult ? result : "No Result!";
}
var number1;
number1 = 7;
var number2 = 7;
var res = add(number1, number2);
console.log(res);
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["CUSTOMER"] = "CUSTOMER";
})(Role || (Role = {}));
var person = {
    name: "Hamid",
    age: 61,
    hobbies: ["Lezanje", "Besposlicarenje"],
    role: [1, Role.ADMIN]
};
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby);
}
function myFunc(n1, n2) {
    return n1 + n2;
}
var addTwoNumbers;
addTwoNumbers = myFunc;
function withCallback(num1, num2, callback) {
    var result = num1 + num2;
    callback(result);
}
withCallback(10, 25, function (res) { return console.log(res); });
function generateError(error, errorCode) {
    throw { error: error, errorCode: errorCode };
}
generateError("Error!", 500);
