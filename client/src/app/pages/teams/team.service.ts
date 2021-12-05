import { Injectable } from '@angular/core'
import { RestService } from 'src/app/shared/services/rest.service'
import { IResponse } from '../../classes/IResponse.generic'
import { ITeam, Team } from '../../classes/Team.entity'
import { CrudService } from '../../classes/CrudService.generic'

@Injectable({
  providedIn: 'root'
})
export class TeamService extends CrudService<ITeam, Team>{

  // section init
  constructor(
    rest: RestService,
  ) { super(rest) }

  get factory() {
    return Team.factory
  }

  // section implementations
  getBody = (entity: Team) => ({
    name: entity.name,
    user_id: entity.user_id
  });

  get uri(): string {
    return 'teams'
  }

  // section logic
  addMember(teamId: string, email: string) {
    return this.rest.post<IResponse<ITeam>>('teams/membership', {
      email: email,
      team: teamId,
    })
  }

  removeMember(teamId: string, email: string) {
    return this.rest.delete<IResponse<ITeam>>('teams/membership', {
      email: email,
      team: teamId,
    })
  }
}
