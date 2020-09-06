var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import App from "../app.js";
import Component from "./BaseComponent.js";
import ProjectItem from "./ProjectItem.js";
import AutoBind from "../decorators/AutoBind.js";
import ProjectStatusesENUM from "../enums/ProjectStatuses.js";
export default class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.projectsSet = new Set();
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        var _a;
        if (((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.types[0]) === "text/plain") {
            event.preventDefault();
            const ulElement = this.element.querySelector("ul");
            if (!ulElement.classList.contains("droppable"))
                ulElement.classList.add("droppable");
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData("text/plain");
        const project = App.projectState.getProjects.find((p) => p.id === projectId);
        const element = document.getElementById(projectId);
        if (project && !this.element.contains(element)) {
            element.remove();
            this.projectsSet.delete(project.title);
            App.projectState.moveProject(projectId, project.status === ProjectStatusesENUM.ACTIVE
                ? ProjectStatusesENUM.FINISHED
                : ProjectStatusesENUM.ACTIVE);
        }
    }
    dragLeaveHandler(event) {
        const ulElement = this.element.querySelector("ul");
        if (!ulElement.contains(event.relatedTarget) &&
            ulElement.classList.contains("droppable"))
            ulElement.classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("drop", this.dropHandler);
        App.projectState.addListener((projects) => {
            this.assignedProjects = projects.filter((p) => p.status === this.type);
            this._renderProjects();
        });
    }
    renderContent() {
        this.element.querySelector("ul").id = `${this.type}-projects-list`;
        this.element.querySelector("h2").textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
    _renderProjects() {
        for (const item of this.assignedProjects) {
            if (!this.projectsSet.has(item.title)) {
                new ProjectItem(this.element.querySelector("ul").id, item);
                this.projectsSet.add(item.title);
            }
        }
    }
}
__decorate([
    AutoBind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    AutoBind
], ProjectList.prototype, "dragLeaveHandler", null);
//# sourceMappingURL=ProjectList.js.map