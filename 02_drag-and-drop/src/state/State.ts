import Project from "../components/Project.js";
import TListener from "../types/TListener.js";
import ProjectStatusesENUM from "../enums/ProjectStatuses.js";

class State<T> {
  protected listeners: TListener<T>[] = [];

  addListener(callback: TListener<T>) {
    this.listeners.push(callback);
  }
}

export default class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  get getProjects() {
    return this.projects;
  }

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) return this.instance;

    this.instance = new ProjectState();

    return this.instance;
  }

  addProject(title: string, description: string, people: number) {
    const project = new Project(
      title,
      description,
      people,
      ProjectStatusesENUM.ACTIVE
    );

    this.projects.push(project);
    this._updateListeners();
  }

  moveProject(id: string, projectStatus: ProjectStatusesENUM) {
    const projectIndex = this.projects.findIndex((p) => p.id === id);

    if (projectIndex > -1) {
      this.projects[projectIndex].status = projectStatus;

      this._updateListeners();
    }
  }

  private _updateListeners() {
    for (const callbackFnc of this.listeners)
      callbackFnc(this.projects.slice());
  }
}
