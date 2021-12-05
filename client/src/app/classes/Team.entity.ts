import { IUser, User } from './User.entity'
import { ITimestamp } from './ITimestamp.interface'
import { ICrud } from './ICrud.interface'

export interface ITeam extends ITimestamp, ICrud{
  id: string
  name: string
  user: IUser
  user_id: string
  users: IUser[]
}

export class Team implements ITeam {
  constructor(
    public id: string,
    public name: string,
    public user: User,
    public user_id: string,
    public users: User[],
    public created_at: string,
    public updated_at: string,
    public edit: boolean = false,
    public del: boolean = false
  ) {}

  static factory(data: ITeam) {
    return new Team(
      data.id ?? '',
      data.name ?? '',
      User.factory(data.user) ?? null,
      data.user_id ?? '',
      data.users?.map(user => User.factory(user)) ?? [],
      data.created_at ?? (new Date()).toISOString(),
      data.updated_at ?? (new Date()).toISOString(),
      data.edit ?? false,
      data.del ?? false
    )
  }
}
