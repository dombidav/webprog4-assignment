import { Injectable } from '@angular/core'
import { RestService } from './rest.service'
import { StorageService } from './storage.service'
import { IToken } from '../../classes/JsonWebToken.entity'
import { IUser } from '../../classes/User.entity'
import { Observable, Subscriber } from 'rxjs'
import { map } from 'rxjs/operators'
import { IResponse } from '../../classes/IResponse.generic'
import { fromPromise } from 'rxjs/internal-compatibility'

/** Service responsible for Authorization and authentication */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // section vars
  public user$: Observable<IUser>;
  public activeUser: IUser | null = null
  private userObserver: Subscriber<IUser>;
  private tokenObject: IToken;
  private permissions: { ability: string, model: 'Task'|'Project'|'User'|'Team', modelId }[] = []

  // section init
  /**
   * Constructor
   * @param rest RestService Responsible for HTTP calls
   * @param storage StorageService Responsible for local storage
   */
  constructor(
    private rest: RestService,
    private storage: StorageService
  ) {
    this.user$ = new Observable<IUser>(observer => {
      this.userObserver = observer
      observer.next(null)
    })
  }

  // section logic
  /**
   * Logs in the user
   * @param email The email of the user
   * @param password The password of the user
   * @param rememberMe Whether the user should be remembered
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(email: string, password: string, rememberMe: boolean) {
    const res = await this.rest.post<IToken>('login', { email, password }, {}, { 'X-AppMeta': 'NO-AUTH' }).toPromise()
    this.tokenObject = res
    await this.storage.set('token', res.token)
    await this.storage.set('tokenObject', res)
    await this.loadProfile()
    return res
  }

  async tryLogin() {
    const token = await this.storage.get('token')
    if (token) {
      this.tokenObject = await this.storage.get('tokenObject')
      await this.loadProfile()
    }
  }

  async loadProfile() {
    await this.storage.waitForStorage()
    if(this.tokenObject) console.log('tokenObject', this.tokenObject)
    let token = this.tokenObject?.token ?? await this.storage.get('token')
    if (token) {
      this.user$ = this.profile().pipe(
        map(res => {
          this.activeUser = res.data
          this.userObserver.next(this.activeUser)
          return res.data
        })
      )
    }
  }

  can(ability: string, model: 'Task'|'Project'|'User'|'Team', modelId) {
    if(!this.activeUser) return fromPromise(Promise.resolve(false))
    if(this.permissions.includes({ ability, model, modelId })) return fromPromise(Promise.resolve(true))

    return this.rest.post<IResponse<boolean>>('can', {
      email: this.activeUser.email,
      ability,
      model,
      modelId
    }).pipe(map(res => {
      this.permissions.push({ ability, model, modelId })
      return res.data
    }))
  }

  /** Get currently logged in user data */
  private profile() {
    return this.rest.get<IResponse<IUser>>('profile')
  }
}
