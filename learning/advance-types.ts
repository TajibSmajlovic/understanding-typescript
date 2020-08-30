type UserOne = {
  name: string;
  privileges: string[];
};

type UserTwo = {
  name: string;
  startDate: Date;
};

type CombinedUser = UserOne | UserTwo;

// const e1: CombinedUser = {
//   name: "User",
//   privileges: [],
//   startDate: new Date(),
// };

function printInfo(emp: CombinedUser): void {
  if ("privileges" in emp) console.log(emp.privileges);
  if ("startDate" in emp) console.log(emp.startDate);
}

class Car {
  drive(): void {
    console.log("Driving...");
  }
}

class Truck {
  loadCargo(): void {
    console.log("Loading");
  }
}

type Vehicle = Car | Truck;

function useVehicle(vehicle: Vehicle) {
  if (vehicle instanceof Truck) vehicle.loadCargo();
  if (vehicle instanceof Car) vehicle.drive();
}

// Discriminated Unions
enum Animals {
  BIRD = "BIRD",
  HORSE = "HORSE",
}

interface IBird {
  type: Animals.BIRD;
  flyingSpeed: number;
}

interface IHorse {
  type: Animals.HORSE;
  runningSpeed: number;
}

type Animal = IBird | IHorse;

function moveAnimal(animal: Animal) {
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

// const p = <HTMLParagraphElement>document.getElementById("message")!
const p = document.getElementById("message") as HTMLParagraphElement;

//
interface IErrorContainer {
  [key: string]: string;
}

const error: IErrorContainer = {
  email: "E-mail error!",
  username: "Username Error",
};

const userInput = "";
const storedData = userInput ?? "DEFAULT"; // userInput is returned
