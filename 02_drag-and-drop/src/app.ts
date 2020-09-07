import ProjectState from "./state/State";
import ProjectInputs from "./components/ProjectInputs";
import ProjectList from "./components/ProjectList";
import ProjectStatusesENUM from "./enums/ProjectStatuses";

export default class App {
  static projectState: ProjectState = ProjectState.getInstance();

  constructor() {
    new ProjectInputs();
    new ProjectList(ProjectStatusesENUM.ACTIVE);
    new ProjectList(ProjectStatusesENUM.FINISHED);
  }
}

new App();

// Using 3rd party libraries
//
import "reflect-metadata";
import _ from "lodash";
import { validate } from "class-validator";

import Model from "./TestModel.model";

declare var GLOBAL: string;

const book = new Model("A book", 15.99);

validate(book).then((errors) => {
  if (errors.length) book.getInformation();
});

console.log(_.shuffle([1, 2, 3]));
console.log(GLOBAL);
