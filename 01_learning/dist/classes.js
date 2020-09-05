"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    getId() {
        return this.id;
    }
    describe() {
        console.log(this.id, this.name);
    }
    addEmployee(name) {
        this.employees.push(name);
    }
}
Department.fiscalYear = 2020;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT Department");
        this.admins = admins;
        this.admins = [...admins];
    }
    static getInstance(admins = []) {
        if (this.instance)
            return this.instance;
        this.instance = new ITDepartment(549651, admins);
        return this.instance;
    }
    addEmployee(name) {
        if (name === "Leo")
            return;
        this.employees.push(name);
    }
    printEmployees() {
        this.employees.forEach((e) => console.log(e));
    }
}
const ITDepartmentInstance = ITDepartment.getInstance(["Leo"]);
const ITDepartmentInstance2 = ITDepartment.getInstance(["Neo"]);
console.log(ITDepartmentInstance, "1");
console.log(ITDepartmentInstance2, "2");
//# sourceMappingURL=classes.js.map