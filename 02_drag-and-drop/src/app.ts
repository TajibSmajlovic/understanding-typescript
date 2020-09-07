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
