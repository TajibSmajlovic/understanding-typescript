type NumOrStr = number | string;
type LiteralType = "as-number" | "as-text";

function add(
  num1: NumOrStr,
  num2: NumOrStr,
  showResult: boolean = true,
  resultType: LiteralType = "as-number"
) {
  let result: number | string;

  if (typeof num1 === "number" && typeof num2 === "number")
    result = num1 + num2;
  else result = num1.toString() + num2.toString();

  if (resultType === "as-number") return +result;

  return showResult ? result : "No Result!";
}

let number1: number;
number1 = 7;
const number2 = 7;

const res = add(number1, number2);
console.log(res);

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  CUSTOMER = "CUSTOMER",
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: "Hamid",
  age: 61,
  hobbies: ["Lezanje", "Besposlicarenje"],
  role: [1, Role.ADMIN],
};

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby);
}

function myFunc(n1: number, n2: number): number {
  return n1 + n2;
}

let addTwoNumbers: (a: number, b: number) => number;
addTwoNumbers = myFunc;

function withCallback(
  num1: number,
  num2: number,
  callback: (n: number) => void
) {
  const result = num1 + num2;

  callback(result);
}

withCallback(10, 25, (res) => console.log(res));

function generateError(error: string, errorCode: number): never {
  throw { error, errorCode };
}

console.log("test" + 123);
generateError("Error!", 500);
