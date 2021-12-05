import {IUser, User} from './User.entity'
import { ITimestamp } from './ITimestamp.interface'

export interface ITeam extends ITimestamp{
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
    public updated_at: string
  ) {}

  static factory(data: ITeam) {
    return new Team(
      data.id,
      data.name,
      User.factory(data.user),
      data.user_id,
      data.users.map(user => User.factory(user)),
      data.created_at,
      data.updated_at
    )
  }
}
