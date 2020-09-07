import App from "../app";
import Component from "./BaseComponent";
import IInput from "../interfaces/IInput";
import AutoBind from "../decorators/AutoBind";
import { validate } from "../utils/helpers";

export default class ProjectInputs extends Component<
  HTMLDivElement,
  HTMLFormElement
> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")!
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")!
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")!
    );

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
