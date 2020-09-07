import App from "../app";
import Component from "./BaseComponent";
import Project from "./Project";
import ProjectItem from "./ProjectItem";
import AutoBind from "../decorators/AutoBind";
import IDragTarget from "../interfaces/IDragTarget";
import TProjectStatus from "../types/TProjectStatuses";
import ProjectStatusesENUM from "../enums/ProjectStatuses";

export default class ProjectList
  extends Component<HTMLDivElement>
  implements IDragTarget {
  assignedProjects: Project[] = [];
  projectsSet: Set<string> = new Set();

  constructor(private readonly type: TProjectStatus) {
    super("project-list", "app", false, `${type}-projects`);

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer?.types[0] === "text/plain") {
      event.preventDefault();

      const ulElement = this.element.querySelector("ul")!;

      if (!ulElement.classList.contains("droppable"))
        ulElement.classList.add("droppable");
    }
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer!.getData("text/plain");
    const project = App.projectState.getProjects.find(
      (p) => p.id === projectId
    );
    const element = document.getElementById(projectId)! as HTMLLIElement;

    if (project && !this.element.contains(element)) {
      element.remove();
      this.projectsSet.delete(project.title);
      App.projectState.moveProject(
        projectId,
        project.status === ProjectStatusesENUM.ACTIVE
          ? ProjectStatusesENUM.FINISHED
          : ProjectStatusesENUM.ACTIVE
      );
    }
  }

  @AutoBind
  dragLeaveHandler(event: DragEvent) {
    const ulElement = this.element.querySelector("ul")!;

    if (
      !ulElement.contains(<Node>event.relatedTarget) &&
      ulElement.classList.contains("droppable")
    )
      ulElement.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    App.projectState.addListener((projects: Project[]) => {
      this.assignedProjects = projects.filter((p) => p.status === this.type);
      this._renderProjects();
    });
  }

  renderContent() {
    this.element.querySelector("ul")!.id = `${this.type}-projects-list`;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private _renderProjects() {
    for (const item of this.assignedProjects) {
      if (!this.projectsSet.has(item.title)) {
        new ProjectItem(this.element.querySelector("ul")!.id, item);
        this.projectsSet.add(item.title);
      }
    }
  }
}
