enum ProjectStatusesENUM {
  ACTIVE = "active",
  FINISHED = "finished",
}

type ProjectStatus = ProjectStatusesENUM.ACTIVE | ProjectStatusesENUM.FINISHED;
type TListener<T> = (items: T[]) => void;

interface IInput {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

interface IDraggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface IDragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

function AutoBind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  return {
    get() {
      return originalMethod.bind(this);
    },
  };
}

function validate(input: IInput) {
  switch (typeof input.value) {
    case "string":
      if (input.required && !input.value.trim().length) return false;
      if (!input.required && input.value) {
        if (input.minLength && input.minLength > input.value.trim().length)
          return false;
        if (input.maxLength && input.maxLength < input.value.trim().length)
          return false;
      }
      return true;

    case "number":
      if (!input.required) return true;
      if (input.required && !input.value) return false;
      if (input.min && input.min > input.value) return false;
      if (input.max && input.max < input.value) return false;
      return true;

    default:
      return true;
  }
}

class State<T> {
  protected listeners: TListener<T>[] = [];

  addListener(callback: TListener<T>) {
    this.listeners.push(callback);
  }
}

class Project {
  readonly id: string;

  constructor(
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatusesENUM
  ) {
    this.id = Math.random().toString();
  }
}

class ProjectState extends State<Project> {
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

abstract class Component<
  T1 extends HTMLElement,
  T2 extends HTMLElement = HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElements: T1;
  element: T2;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    elementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElements = document.getElementById(hostElementId)! as T1;
    this.element = document.importNode(this.templateElement.content, true)
      .firstElementChild as T2;
    if (elementId) this.element.id = `${elementId}`;

    this._attach(insertAtStart);
  }

  private _attach(insertAtStart: boolean) {
    this.hostElements.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;

  abstract renderContent(): void;
}

class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements IDraggable {
  private readonly project: Project;

  public get persons(): string {
    return this.project.people === 1
      ? "1 persons "
      : `${this.project.people} persons `;
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  @AutoBind
  dragEndHandler(_: DragEvent) {}

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + "assigned.";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

class ProjectList extends Component<HTMLDivElement> implements IDragTarget {
  assignedProjects: Project[] = [];
  projectsSet: Set<string> = new Set();

  constructor(private readonly type: ProjectStatus) {
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

    if (project) {
      document.getElementById(projectId)!.remove();
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

class ProjectInputs extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this._submitHandler);
  }

  renderContent() {}

  private _gatherUserInput(): void | [string, string, number] {
    const title = this.titleInputElement;
    const description = this.descriptionInputElement;
    const people = this.peopleInputElement;

    const titleInput: IInput = {
      value: title.value,
      required: title.required || true,
      minLength: title.minLength !== -1 ? title.minLength : 5,
      maxLength: title.maxLength !== -1 ? title.maxLength : 100,
    };

    const descriptionInput: IInput = {
      value: description.value,
      required: description.required,
      minLength: description.minLength !== -1 ? title.minLength : 15,
      maxLength: description.maxLength !== -1 ? title.maxLength : 500,
    };

    const peopleInput: IInput = {
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

  private _clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @AutoBind
  private _submitHandler(event: Event) {
    event.preventDefault();

    const userInput = this._gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;

      App.projectState.addProject(title, description, people);
      this._clearInputs();
    }
  }
}

class App {
  static projectState: ProjectState = ProjectState.getInstance();
  projectInputs: ProjectInputs;
  activeProjectsList: ProjectList;
  finishedProjectsList: ProjectList;

  constructor() {
    this.projectInputs = new ProjectInputs();
    this.activeProjectsList = new ProjectList(ProjectStatusesENUM.ACTIVE);
    this.finishedProjectsList = new ProjectList(ProjectStatusesENUM.FINISHED);
  }
}

const app = new App();
