"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ProjectStatusesENUM;
(function (ProjectStatusesENUM) {
    ProjectStatusesENUM["ACTIVE"] = "active";
    ProjectStatusesENUM["FINISHED"] = "finished";
})(ProjectStatusesENUM || (ProjectStatusesENUM = {}));
function AutoBind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    return {
        get() {
            return originalMethod.bind(this);
        },
    };
}
function validate(input) {
    switch (typeof input.value) {
        case "string":
            if (input.required && !input.value.trim().length)
                return false;
            if (!input.required && input.value) {
                if (input.minLength && input.minLength > input.value.trim().length)
                    return false;
                if (input.maxLength && input.maxLength < input.value.trim().length)
                    return false;
            }
            return true;
        case "number":
            if (!input.required)
                return true;
            if (input.required && !input.value)
                return false;
            if (input.min && input.min > input.value)
                return false;
            if (input.max && input.max < input.value)
                return false;
            return true;
        default:
            return true;
    }
}
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(callback) {
        this.listeners.push(callback);
    }
}
class Project {
    constructor(title, description, people, status) {
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
        this.id = Math.random().toString();
    }
}
class ProjectState extends State {
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
class Component {
    constructor(templateId, hostElementId, insertAtStart, elementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElements = document.getElementById(hostElementId);
        this.element = document.importNode(this.templateElement.content, true)
            .firstElementChild;
        if (elementId)
            this.element.id = `${elementId}`;
        this._attach(insertAtStart);
    }
    _attach(insertAtStart) {
        this.hostElements.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    }
}
class ProjectItem extends Component {
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        return this.project.people === 1
            ? "1 persons "
            : `${this.project.people} persons `;
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(_) { }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.persons + "assigned.";
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    AutoBind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    AutoBind
], ProjectItem.prototype, "dragEndHandler", null);
class ProjectList extends Component {
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
        if (project) {
            document.getElementById(projectId).remove();
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
class ProjectInputs extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", this._submitHandler);
    }
    renderContent() { }
    _gatherUserInput() {
        const title = this.titleInputElement;
        const description = this.descriptionInputElement;
        const people = this.peopleInputElement;
        const titleInput = {
            value: title.value,
            required: title.required || true,
            minLength: title.minLength !== -1 ? title.minLength : 5,
            maxLength: title.maxLength !== -1 ? title.maxLength : 100,
        };
        const descriptionInput = {
            value: description.value,
            required: description.required,
            minLength: description.minLength !== -1 ? title.minLength : 15,
            maxLength: description.maxLength !== -1 ? title.maxLength : 500,
        };
        const peopleInput = {
            value: +people.value,
            required: people.required || true,
            min: +people.min || 1,
            max: +people.max || 20,
        };
        return !validate(titleInput) ||
            !validate(descriptionInput) ||
            !validate(peopleInput)
            ? alert("Invalid input, please try again!")
            : [title.value, description.value, +people.value];
    }
    _clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    _submitHandler(event) {
        event.preventDefault();
        const userInput = this._gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            App.projectState.addProject(title, description, people);
            this._clearInputs();
        }
    }
}
__decorate([
    AutoBind
], ProjectInputs.prototype, "_submitHandler", null);
class App {
    constructor() {
        this.projectInputs = new ProjectInputs();
        this.activeProjectsList = new ProjectList(ProjectStatusesENUM.ACTIVE);
        this.finishedProjectsList = new ProjectList(ProjectStatusesENUM.FINISHED);
    }
}
App.projectState = ProjectState.getInstance();
const app = new App();
//# sourceMappingURL=app.js.map