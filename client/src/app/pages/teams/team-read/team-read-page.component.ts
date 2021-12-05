import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { Subscription } from 'rxjs'
import { Team } from '../../../classes/Team.entity'
import { TeamService } from '../team.service'
import { Project } from '../../../classes/Project.entity'
import { ProjectService } from '../../projects/project.service'

@Component({
  selector: 'app-team-read',
  templateUrl: './team-read.page.html',
  styleUrls: [ './team-read.page.scss' ],
})
export class TeamReadPage implements OnInit, OnDestroy {
  // section vars
  private teamId: string
  public team: Team
  private teamId$: Subscription
  private team$: Subscription
  private project$: Subscription
  itemDialog = false
  input: string = null
  project: Project = Project.factory({})
  submitted = false
  projectDialog = false

  // section init
  constructor(
    private readonly route: ActivatedRoute,
    private readonly teamService: TeamService,
    private readonly projectService: ProjectService,
    private readonly message: MessageService,
    private readonly confirm: ConfirmationService,
  ) {
    this.teamId$ = this.route.params.subscribe(params => {
      this.project = Project.factory({ team_id: params.id })
      this.teamId = params.id
    })
  }

  ngOnInit() {
    this.init()
  }

  init() {
    this.team$ = this.teamService.read(this.teamId).subscribe(team => this.team = team)
  }

  //section logic
  removeMember(email: string) {
    this.confirm.confirm({
      message: 'Are you sure you want to remove this member?',
      accept: () => {
        this.team$ = this.teamService.removeMember(this.teamId, email).subscribe(res => {
          this.message.add({ severity: 'success', summary: 'Success', detail: 'Member removed' })
          this.team = res.data
        })
      }
    })
  }

  saveMember() {
    this.submitted = true
    if(this.project) {
      this.team$ = this.teamService.addMember(this.teamId, this.input).subscribe(res => {
        this.team = res.data
        this.message.add({ severity: 'success', summary: 'Success', detail: 'Member added' })
      })
      this.hideDialog()
    }
  }

  // section dialog-logic
  showDialog() {
    this.itemDialog = true
    this.input = null
  }

  hideDialog() {
    this.itemDialog = false
    this.projectDialog = false
  }

  showAddProjectDialog() {
    this.projectDialog = true
    this.project = Project.factory({ team_id: this.teamId })
  }

  showEditProjectDialog(project: Project) {
    this.project = project
    this.project.team_id = this.teamId
    this.projectDialog = true
    this.submitted = false
  }

  // section project-logic
  removeProject(project: Project) {
    this.confirm.confirm({
      message: 'Are you sure you want to remove this project?',
      accept: () => {
        this.project$ = this.projectService.delete(project).subscribe(() => {
          this.message.add({ severity: 'success', summary: 'Success', detail: 'Project removed' })
          this.init()
        })
      }
    })
  }

  saveProject() {
    this.submitted = true
    if(this.project.name) {
      if(this.project.id) {
        this.project$ = this.projectService.edit(this.project).subscribe(() => {
          this.message.add({ severity: 'success', summary: 'Success', detail: 'Project edited' })
        })
      } else {
        this.project$ = this.projectService.add(Project.factory({
          name: this.project.name,
          shortname: this.project.shortname,
          team_id: this.teamId
        })).subscribe(() => {
          this.message.add({ severity: 'success', summary: 'Success', detail: 'Project added' })
        })
      }
      this.init()
      this.hideDialog()
    }
  }

  // section destruct
  ngOnDestroy() {
    this.teamId$?.unsubscribe()
    this.team$?.unsubscribe()
    this.project$?.unsubscribe()
  }
}
