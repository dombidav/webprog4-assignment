import { ITimestamp } from './ITimestamp.interface'
import { ICrud } from './ICrud.interface'
import {Team} from "./Team.entity";
import {Task} from "./Task.entity";

export interface IProject extends ITimestamp, ICrud{
  id: string
  name: string
  description: string
  shortname: string
  team_id: string
  team: Team
  tasks: Task[]
}

export class Project implements IProject {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public shortname: string,
    public team_id: string,
    public team: Team,
    public tasks: Task[],
    public created_at: string,
    public updated_at: string,
    public edit: boolean = false,
    public del: boolean = false
  ) {}

  public static factory(data: IProject|any) {
    return new Project(
      data.id ?? '',
      data.name ?? '',
      data.description ?? '',
      data.shortname ?? '',
      data.team_id ?? '',
      data.team ?? Team.factory({}),
      data.tasks ?? [],
      data.created_at ?? (new Date()).toISOString(),
      data.updated_at ?? (new Date()).toISOString(),
      data.edit ?? false,
      data.del ?? false
    )
  }
}
