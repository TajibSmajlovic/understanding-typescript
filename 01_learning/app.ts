function Logger(message: string) {
  return function (target: Function) {
    console.log(message);
    console.log(target, "Target");
  };
}

function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        const htmlEl = document.getElementById(hookId)!;

        htmlEl.innerHTML = template;
        htmlEl.querySelector("h1")!.textContent = this.name;
      }
    };
  };
}

@Logger("LOGGING - USER") // executes 2nd
@WithTemplate("<h1>My new template</h1>", "app") // executes 1st
class MyPerson {
  constructor(public name: string = "Tajib") {}

  getName() {
    return this.name;
  }
}

function Log(target: any, propertyName: string | Symbol) {
  console.log(target, propertyName);
}

function Log2(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log // Property decorator
  readonly title: string;
  private _price: number;

  @Log2 // Accessor decorator
  set price(val: number) {
    if (val > 0) this._price = val;
    else throw new Error("Invalid input");
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3 // Method decorator
  getPriceWithTax(
    @Log4 // Parameter decorator
    tax: number
  ) {
    return this._price * (1 / tax);
  }
}

//
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() // before execution of function get() will first execute
    {
      const boundFn = originalMethod.bind(this); // this will reefer on instance of object
      return boundFn;
    },
  };

  return adjDescriptor;
}

class Printer {
  private message = "This works!";

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", printer.showMessage);

//
interface IValidatorConfig {
  [key: string]: {
    [validateProp: string]: string[]; // ["required", "positive"]
  };
}

const registeredValidators: IValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objectValidatorConfig = registeredValidators[obj.constructor.name];

  if (!objectValidatorConfig) return true;

  let isValid = true;

  for (const prop in objectValidatorConfig) {
    for (const validator of objectValidatorConfig[prop]) {
      switch (validator) {
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
        case "required":
          isValid = isValid && !!obj[prop];
          break;

        default:
          break;
      }
    }
  }

  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title: string = (document.getElementById("title") as HTMLInputElement)
    .value;
  const price: number = +(document.getElementById("price") as HTMLInputElement)
    .value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("Invalid input");
    return;
  }
  console.log(createdCourse);
});
