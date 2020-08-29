// type AddFn = (a: number, b:  number) => number
interface IAddFn {
  (a: number, b: number): number;
}

let addFn: IAddFn = (n1: number, n2: number) => n1 + n2;

type Greet = {
  readonly name: string;
  greet(text: string): void;
};

interface IName {
  readonly name?: string;
  age?: string; // optional
}

interface IGreet extends IName {
  greed?(word: string): void;
}

class Person implements IGreet {
  name?: string;

  constructor(name?: string) {
    if (name) this.name = name;
  }

  greed(word: string): void {
    console.log(word + this.name);
  }
}

console.log(new Person());
