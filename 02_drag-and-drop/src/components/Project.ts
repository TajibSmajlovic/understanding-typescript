import ProjectStatusesENUM from "../enums/ProjectStatuses";

export default class Project {
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
