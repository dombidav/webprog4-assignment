import { Injectable } from '@angular/core'
import { CrudService } from '../../classes/CrudService.generic'
import { IProject, Project } from '../../classes/Project.entity'

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends CrudService<IProject, Project>{
  get factory() {
    return Project.factory
  }

  getBody(entity: Project): any {
    return {
      name: entity.name,
      shortname: entity.shortname,
      team_id: entity.team_id
    }
  }

  get uri() {
    return 'projects'
  }

}
