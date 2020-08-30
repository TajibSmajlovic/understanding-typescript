// const names: Array<string> = [];

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("It works!");
  }, 1000);

  reject();
});

function merge<T1 extends object, T2 extends object>(objA: T1, objB: T2) {
  return Object.assign(objA, objB);
}

interface ILengthy {
  length: number;
}

function countAndDescribe<T extends ILengthy>(
  element: T
): [T, number | string] {
  return [element, element.length ? element.length : "Got no value"];
}

function extractAndConvert<T1 extends object, T2 extends keyof T1>(
  obj: T1,
  key: T2
) {
  return "value" + obj[key];
}

//
class DataStorage<T extends string | number> {
  constructor(private data: T[] = []) {}

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;

    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

//
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  completeUntil: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;

  return courseGoal as CourseGoal;
}

const numbers: Readonly<[number, string]> = [1, "Leo"];
