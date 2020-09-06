export default class Component {
    constructor(templateId, hostElementId, insertAtStart, elementId) {
        this.templateElement = (document.getElementById(templateId));
        this.hostElements = document.getElementById(hostElementId);
        this.element = (document.importNode(this.templateElement.content, true).firstElementChild);
        if (elementId)
            this.element.id = `${elementId}`;
        this._attach(insertAtStart);
    }
    _attach(insertAtStart) {
        this.hostElements.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=BaseComponent.js.map