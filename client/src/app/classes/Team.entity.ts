import { IUser } from './User.entity'
import { ITimestamp } from './ITimestamp.interface'

export interface ITeam extends ITimestamp{
  id: string
  name: string
  user: IUser
  user_id: string
}

export class Team implements ITeam {
  constructor(
    public id: string,
    public name: string,
    public user: IUser,
    public user_id: string,
    public created_at: string,
    public updated_at: string
  ) {}

  static factory(data: ITeam) {
    return new Team(
      data.id,
      data.name,
      data.user,
      data.user_id,
      data.created_at,
      data.updated_at
    )
  }
}
