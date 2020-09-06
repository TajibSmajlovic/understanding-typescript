export default abstract class Component<
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
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateId)!
    );
    this.hostElements = document.getElementById(hostElementId)! as T1;
    this.element = <T2>(
      document.importNode(this.templateElement.content, true).firstElementChild
    );

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
