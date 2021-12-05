import { Injectable } from '@angular/core'
import { RestService } from 'src/app/shared/services/rest.service'
import { IResponse } from '../../classes/IResponse.generic'
import { ITeam, Team } from '../../classes/Team.entity'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private readonly rest: RestService
  ) { }

  browse(): Observable<Team[]> {
    return this.rest.get<IResponse<ITeam[]>>('teams').pipe(map(res => res.data.map(Team.factory)))
  }

  read(id: string) {
    return this.rest.get<IResponse<ITeam>>(`teams/${id}`).pipe(map(res => Team.factory(res.data)))
  }

  edit(team: Team) {
    return this.rest.put(`teams/${team.id}`, {
      name: team.name,
      user_id: team.user_id
    })
  }

  add(team: Team) {
    return this.rest.post('teams', {
      name: team.name,
      user_id: team.user_id
    })
  }

  delete(id) {
    return this.rest.delete(`teams/${id}`)
  }

  addMember(teamId: string, email: string) {
    return this.rest.post<IResponse<ITeam>>(`teams/membership`, {
      email: email,
      team: teamId,
    })
  }

  removeMember(teamId: string, email: string) {
    return this.rest.delete<IResponse<ITeam>>(`teams/membership`, {
      email: email,
      team: teamId,
    })
  }
}
