import { Injectable } from '@angular/core'
import { StorageService } from './storage.service'
import { environment } from '../../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http'


/** Handles HTTP requests to the REST API */
@Injectable({
  providedIn: 'root'
})
export class RestService {

  /**
   * @param http Responsible for HTTP requests
   * @param storage Responsible for storing and retrieving data from the local storage
   */
  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  /**
   * Initiates a GET request to the REST API
   * @param uri The URI of the REST API endpoint
   * @param parameters The parameters to be sent in the query string
   * @param headers The headers to be sent with the request
   */
  get = <T>(uri: string, parameters = {}, headers = {}) => this.http.get<T>(
    this.buildUri(uri, parameters),
    { headers: this.buildHeaders(headers) }
  )

  /**
   * Initiates a POST request to the REST API
   * @param uri The URI of the REST API endpoint
   * @param parameters The parameters to be sent in the query string
   * @param body The body of the request
   * @param headers The headers to be sent with the request
   */
  post = <T>(uri: string, body = {}, parameters = {}, headers = {}) =>
    this.http.post<T>(
      this.buildUri(uri, parameters),
      body,
      { headers: this.buildHeaders(headers) }
    )

  /**
   * Initiates a PUT request to the REST API
   * @param uri The URI of the REST API endpoint
   * @param parameters The parameters to be sent in the query string
   * @param body The body of the request
   * @param headers The headers to be sent with the request
   */
  put = <T>(uri: string, body = {}, parameters = {}, headers = {}) =>
    this.http.put<T>(
      this.buildUri(uri, parameters),
      body,
      { headers: this.buildHeaders(headers) }
    )

  /**
   * Initiates a DELETE request to the REST API
   * @param uri The URI of the REST API endpoint
   * @param parameters The parameters to be sent in the query string
   * @param headers The headers to be sent with the request
   */
  delete = <T>(uri: string, parameters = {}, headers = {}) =>
    this.http.delete<T>(
      this.buildUri(uri, parameters),
      { headers: this.buildHeaders(headers) }
    )

  /**
   * Builds the URI of the REST API endpoint
   * @param uri The URI of the REST API endpoint
   * @param from The parameters to be sent in the query string
   */
  buildUri(uri, from = {}){
    return `${environment.apiUrl}/${uri}?${Object.keys(from).map(key => `${key}=${encodeURIComponent(from[key])}`).join('&')}`
  }

  /**
   * Builds the headers to be sent with the request
   * @param from The headers to be sent with the request
   * @param noAuth If true, the Authorization header will not be sent
   */
  buildHeaders(from: {}, noAuth: boolean = false): HttpHeaders {
    let header = new HttpHeaders({
      ...from,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })

    if (noAuth) return header // No need to add the Authorization header

    /**
     * If the user is logged in, add the Authorization header
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
     */
    this.storage?.get('user')?.then(user => {
      if (user){
        header.append('withCredentials', 'true')
        header.append('Authorization', `Bearer ${user.token}`)
      }
    })

    return header

  }
}
