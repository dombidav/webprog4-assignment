import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Location } from '@angular/common'
import { AuthService } from './auth.service'

/** Path to app HOME */
export const HOME = '/home'

/** Pages in the application */
export const PAGES = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  home: { title: 'Home', url: HOME, icon: 'home', guard: _ => true },
  login: { title: 'Login', url: 'auth/login', icon: 'person', guard: (auth: AuthService) => !auth.activeUser },
  register: { title: 'Register', url: 'auth/register', icon: 'persons', guard: (auth: AuthService) => !auth.activeUser },
  profile: { title: 'Profile', url: 'profile', icon: 'person', guard: (auth: AuthService) => auth.activeUser },
  teams: { title: 'Teams', url: 'teams', icon: 'people', guard: (auth: AuthService) => auth.activeUser },
}

/** Service which handles redirects between components */
@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  /** List of intended redirects. Not necessarily all was visited. */
  #urls: string[] = []

  /**
   * @param router Router singleton (Angular or Ionic strategy as defined in {@link AppModule})
   * @param location Basic JS location object
   */
  constructor(
    private router: Router,
    private location: Location
  ) {
  }

  /** Get next redirection target */
  get next() {
    return this.#urls[this.#urls.length - 1]
  }

  /** Push a new redirect target on to the stack */
  push(url: string) {
    this.#urls.push(url)
  }

  /** Redirect to login2 path */
  login() {
    return this.router.parseUrl('/login2')
  }

  /**
   * Redirect to a fixed location
   *
   * @param url target path
   * @param extra query parameters
   * @default empty object
   * @param hardJump if true {@link window.location.replace} will be used. The current module will be unloaded if it is lazy loaded.
   * @default false
   * @param callback will be called only if {@link @param hardJump} is false.
   * @default empty
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  to(url: string, extra: any = {}, hardJump = false, callback = _r => { }) {
    if (hardJump) window.location.replace(url)
    else this.router.navigateByUrl(url, { state: extra }).then(r => callback(r))
  }

  /**
   * Redirect to the target on the top of the stack.
   *
   * @param defaultTarget Redirect target if the stack is empty
   * @default {@link HOME}
   * @param hardJump if true {@link window.location.replace} will be used. The current module will be unloaded if it is lazy loaded.
   * @default false
   */
  intendedOr(defaultTarget: string = HOME, hardJump = false) {
    const url = this.#urls.pop() ?? defaultTarget
    if (hardJump) window.location.replace(url)
    else this.router.navigateByUrl(url)
  }

  /** Navigate back using the platform history. */
  back() {
    return this.location.back()
  }
}
