import Project from "../components/Project.js";
import ProjectStatusesENUM from "../enums/ProjectStatuses.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(callback) {
        this.listeners.push(callback);
    }
}
export default class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    get getProjects() {
        return this.projects;
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, people) {
        const project = new Project(title, description, people, ProjectStatusesENUM.ACTIVE);
        this.projects.push(project);
        this._updateListeners();
    }
    moveProject(id, projectStatus) {
        const projectIndex = this.projects.findIndex((p) => p.id === id);
        if (projectIndex > -1) {
            this.projects[projectIndex].status = projectStatus;
            this._updateListeners();
        }
    }
    _updateListeners() {
        for (const callbackFnc of this.listeners)
            callbackFnc(this.projects.slice());
    }
}
//# sourceMappingURL=State.js.map