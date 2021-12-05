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

  getBody(entity: User): any {
    // TODO: Implement
  }

  get uri(): string {
    return 'users'
  }
}
