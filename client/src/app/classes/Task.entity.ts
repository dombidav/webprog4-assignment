import {Project} from "./Project.entity";
import {User} from "./User.entity";

export interface ITask {
  id: string
  name: string
  description: string
  parent_id: string
  project_id: string
  reporter_id: string
  assignee_id: string
  status: 0|1|2|3
  parent: Task|null
  subtasks: Task[]
  project: Project
  assignee: User|null
  reporter: User|null
  count: number
}

export class Task implements ITask{
  get shortName() {
    return `${this.project?.shortname ?? 'GLOBAL'}-${this.count}`
  }
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public parent_id: string|null,
    public project_id: string,
    public reporter_id: string|null,
    public assignee_id: string|null,
    public status: 0|1|2|3,
    public parent: Task|null,
    public subtasks: Task[],
    public project: Project,
    public assignee: User|null,
    public reporter: User|null,
    public count: number
  ) {}

  static factory(data: ITask|any) {
    return new Task(
      data.id ?? '',
      data.name ?? '',
      data.description ?? '',
      data.parent_id ?? null,
      data.project_id ?? '',
      data.reporter_id ?? null,
      data.assignee_id ?? null,
      data.status ?? 0,
      data.parent ?? null,
      data.subtasks ?? [],
      data.project ?? Project.factory({}),
      data.assignee ?? null,
      data.reporter ?? null,
      data.count ?? 1
    )
  }
}
