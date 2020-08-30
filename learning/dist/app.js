"use strict";
function printInfo(emp) {
    if ("privileges" in emp)
        console.log(emp.privileges);
    if ("startDate" in emp)
        console.log(emp.startDate);
}
var Car = (function () {
    function Car() {
    }
    Car.prototype.drive = function () {
        console.log("Driving...");
    };
    return Car;
}());
var Truck = (function () {
    function Truck() {
    }
    Truck.prototype.loadCargo = function () {
        console.log("Loading");
    };
    return Truck;
}());
function useVehicle(vehicle) {
    if (vehicle instanceof Truck)
        vehicle.loadCargo();
    if (vehicle instanceof Car)
        vehicle.drive();
}
//# sourceMappingURL=app.js.map