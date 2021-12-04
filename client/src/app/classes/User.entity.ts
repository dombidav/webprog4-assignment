import { ITimestamp } from './ITimestamp.interface'

/** Used as a type when making a request to the API */
export interface IUser extends ITimestamp{
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
   */
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public created_at: string,
    public updated_at: string
  ) {}


}
