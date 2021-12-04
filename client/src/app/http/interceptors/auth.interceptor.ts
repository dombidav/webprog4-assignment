import { Injectable } from '@angular/core'
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { StorageService } from '../../shared/services/storage.service'
import { fromPromise } from 'rxjs/internal-compatibility'
import { RedirectService } from '../../shared/services/redirect.service'

/** Handles Authorization and authentication errors */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * @param storage Service responsible for handling local storage
   * @param redirect Service responsible for handling redirects
   */
  constructor(
    private storage: StorageService,
    private redirect: RedirectService,
  ) {}

  /**
   * Called every time an HTTP request starts from the application
   *
   * @param req Request initiated by the user
   * @param next Next function in call pipe
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return fromPromise(this.handle(next, req))
  }

  /**
   * Handles error responses
   *
   * @param err HTTP Error object
   * @private
   */
  private handleError(err: HttpErrorResponse): Observable<any> {
    switch (err.status) {
      case 401:
        this.redirect.push(window.location.href)
        this.redirect.to('/login2')
        break
      case 422: //Validation Error
      default:
        return throwError(err)
    }

    return of(err.message)
  }

  /**
   * Request handler function
   *
   * @param next Next handler in pipe
   * @param req Request initiated by the user
   * @private
   */
  private async handle(next: HttpHandler, req: HttpRequest<any>) {
    let token: string = null
    if (!req.headers.get('X-AppMeta')?.split(',').includes('NO-AUTH'))
      token = await this.storage.get<string>('token') ?? null

    const authReq = req.clone(token ? { headers: req.headers.set('Authorization', `Bearer ${token.toString()}`) } : {}) //Request object are immutable

    return next.handle(authReq).pipe(catchError(x => this.handleError(x))).toPromise() //Add the error handler to the pipe
  }
}
