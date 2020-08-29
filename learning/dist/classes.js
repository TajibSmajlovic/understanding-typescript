"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Department = (function () {
    function Department(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    Department.prototype.getId = function () {
        return this.id;
    };
    Department.prototype.describe = function () {
        console.log(this.id, this.name);
    };
    Department.prototype.addEmployee = function (name) {
        this.employees.push(name);
    };
    Department.fiscalYear = 2020;
    return Department;
}());
var ITDepartment = (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(id, admins) {
        var _this = _super.call(this, id, "IT Department") || this;
        _this.admins = admins;
        _this.admins = __spreadArrays(admins);
        return _this;
    }
    ITDepartment.getInstance = function (admins) {
        if (admins === void 0) { admins = []; }
        if (this.instance)
            return this.instance;
        this.instance = new ITDepartment(549651, admins);
        return this.instance;
    };
    ITDepartment.prototype.addEmployee = function (name) {
        if (name === "Leo")
            return;
        this.employees.push(name);
    };
    ITDepartment.prototype.printEmployees = function () {
        this.employees.forEach(function (e) { return console.log(e); });
    };
    return ITDepartment;
}(Department));
var ITDepartmentInstance = ITDepartment.getInstance(["Leo"]);
var ITDepartmentInstance2 = ITDepartment.getInstance(["Neo"]);
console.log(ITDepartmentInstance, "1");
console.log(ITDepartmentInstance2, "2");
//# sourceMappingURL=classes.js.map