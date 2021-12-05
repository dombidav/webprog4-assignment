import { ITimestamp } from './ITimestamp.interface'
import { ICrud } from './ICrud.interface'

/** Used as a type when making a request to the API */
export interface IUser extends ITimestamp, ICrud{
  id: string
  name: string
  email: string
  password: string
}

/** Represents a user object  */
export class User implements IUser{

  /**
   * @param id The UUIDv4 of the user
   * @param name The name of the user
   * @param email The email of the user
   * @param password The password of the user
   * @param created_at
   * @param updated_at
   * @param edit
   * @param del
   */
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public created_at: string,
    public updated_at: string,
    public edit: boolean,
    public del: boolean
  ) {}


  static factory(user: IUser) {
    return new User(
      user.id ?? '',
      user.name ?? '',
      user.email ?? '',
      user.password ?? '',
      user.created_at ?? (new Date()).toISOString(),
      user.updated_at ?? (new Date()).toISOString(),
      user.edit ?? false,
      user.del ?? false
    )
  }
}
