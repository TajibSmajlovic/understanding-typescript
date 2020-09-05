"use strict";
function printInfo(emp) {
    if ("privileges" in emp)
        console.log(emp.privileges);
    if ("startDate" in emp)
        console.log(emp.startDate);
}
class Car {
    drive() {
        console.log("Driving...");
    }
}
class Truck {
    loadCargo() {
        console.log("Loading");
    }
}
function useVehicle(vehicle) {
    if (vehicle instanceof Truck)
        vehicle.loadCargo();
    if (vehicle instanceof Car)
        vehicle.drive();
}
var Animals;
(function (Animals) {
    Animals["BIRD"] = "BIRD";
    Animals["HORSE"] = "HORSE";
})(Animals || (Animals = {}));
function moveAnimal(animal) {
    switch (animal.type) {
        case Animals.BIRD:
            console.log(animal.flyingSpeed);
            break;
        case Animals.HORSE:
            console.log(animal.runningSpeed);
            break;
        default:
            break;
    }
}
moveAnimal({ type: Animals.BIRD, flyingSpeed: 15 });
const p = document.getElementById("message");
const error = {
    email: "E-mail error!",
    username: "Username Error",
};
const userInput = "";
const storedData = userInput !== null && userInput !== void 0 ? userInput : "DEFAULT";
//# sourceMappingURL=advance-types.js.map