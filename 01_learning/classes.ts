abstract class Department {
  static fiscalYear: number = 2020;
  // private name: string;
  protected employees: string[] = [];

  constructor(private readonly id: number, public name: string) {
    // this.name = name;
  }

  getId(): number {
    return this.id;
  }

  // setId(value: number): void {
  //   this.id = value
  // }

  describe(this: Department): void {
    console.log(this.id, this.name);
  }

  addEmployee(name: string): void {
    this.employees.push(name);
  }

  abstract printEmployees(): void;
}

class ITDepartment extends Department {
  private static instance: ITDepartment;

  private constructor(id: number, public admins: string[]) {
    super(id, "IT Department");
    this.admins = [...admins];
  }

  static getInstance(admins: string[] = []): ITDepartment {
    if (this.instance) return this.instance;

    this.instance = new ITDepartment(549651, admins);

    return this.instance;
  }

  addEmployee(name: string): void {
    if (name === "Leo") return;

    this.employees.push(name);
  }

  printEmployees(): void {
    this.employees.forEach((e) => console.log(e));
  }
}

// const ITDepartmentObj = new ITDepartment(1, ["Leo"]);
const ITDepartmentInstance = ITDepartment.getInstance(["Leo"]);
const ITDepartmentInstance2 = ITDepartment.getInstance(["Neo"]);

console.log(ITDepartmentInstance, "1");
console.log(ITDepartmentInstance2, "2");
