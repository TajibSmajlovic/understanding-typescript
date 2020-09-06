import ProjectState from "./state/State.js";
import ProjectInputs from "./components/ProjectInputs.js";
import ProjectList from "./components/ProjectList.js";
import ProjectStatusesENUM from "./enums/ProjectStatuses.js";
export default class App {
    constructor() {
        new ProjectInputs();
        new ProjectList(ProjectStatusesENUM.ACTIVE);
        new ProjectList(ProjectStatusesENUM.FINISHED);
    }
}
App.projectState = ProjectState.getInstance();
new App();
//# sourceMappingURL=app.js.map