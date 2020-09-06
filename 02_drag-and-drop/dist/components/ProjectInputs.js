var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import App from "../app.js";
import Component from "./BaseComponent.js";
import AutoBind from "../decorators/AutoBind.js";
import { validate } from "../utils/helpers.js";
export default class ProjectInputs extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = (this.element.querySelector("#title"));
        this.descriptionInputElement = (this.element.querySelector("#description"));
        this.peopleInputElement = (this.element.querySelector("#people"));
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
//# sourceMappingURL=ProjectInputs.js.map