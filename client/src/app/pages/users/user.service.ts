import { Injectable } from '@angular/core'
import { CrudService } from '../../classes/CrudService.generic'
import { IUser, User } from '../../classes/User.entity'

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<IUser, User>{
  get factory() {
    return User.factory
  }

  getBody(__entity: User): any {
    return {} // Unused
  }

  get uri(): string {
    return 'users'
  }
}
