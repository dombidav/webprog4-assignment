import { RestService } from '../shared/services/rest.service'
import { Observable } from 'rxjs'
import { IResponse } from './IResponse.generic'
import { map } from 'rxjs/operators'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<TInterface, TClass extends TInterface, TPost=any, TPut=any> {
  // section init
  constructor(
    protected readonly rest: RestService
  ) { }

  // section base props
  protected get idName(): string {
    return 'id'
  }
  abstract get uri(): string;
  abstract get factory(): (data: TInterface|any) => TClass;
  abstract getBody(entity: TClass): TPost&TPut;

  // section uris
  protected getBrowseUri(): string {
    return this.uri
  }
  protected getReadUri(id: string): string {
    return `${this.uri}/${id}`
  }
  protected getEditUri(tClass: TClass): string {
    return `${this.uri}/${tClass[this.idName]}`
  }
  protected getAddUri(): string {
    return this.uri
  }
  protected getDeleteUri(tClass: TClass): string {
    return `${this.uri}/${tClass}`
  }

  // section bodies
  protected getAddBody(entity: TClass): TPost {
    return this.getBody(entity)
  }
  protected getEditBody(entity: TClass): TPut {
    return this.getBody(entity)
  }

  // section logic
  browse(): Observable<TClass[]> {
    return this.rest.get<IResponse<TInterface[]>>(this.getBrowseUri()).pipe(map(res => res.data.map(this.factory)))
  }

  read(id: string) {
    return this.rest.get<IResponse<TInterface>>(this.getReadUri(id)).pipe(map(res => this.factory(res.data)))
  }

  edit(tClass: TClass) {
    return this.rest.put<TPut>(this.getEditUri(tClass), this.getEditBody(tClass))
  }

  add(tClass: TClass) {
    return this.rest.post<TPost>(this.getAddUri(), this.getAddBody(tClass))
  }

  delete(tClass: TClass) {
    return this.rest.delete(this.getDeleteUri(tClass[this.idName]))
  }
}
