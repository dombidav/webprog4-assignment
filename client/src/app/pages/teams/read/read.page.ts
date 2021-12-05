import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { Subscription } from 'rxjs'
import { Team } from '../../../classes/Team.entity'
import { TeamService } from '../team.service'

@Component({
  selector: 'app-read',
  templateUrl: './read.page.html',
  styleUrls: [ './read.page.scss' ],
})
export class ReadPage implements OnInit, OnDestroy {
  // section vars
  private teamId: string
  public team: Team
  private teamId$: Subscription
  private team$: Subscription;
  itemDialog = false
  email: string = null
  submitted = false

  // section init
  constructor(
    private readonly route: ActivatedRoute,
    private readonly teamService: TeamService,
    private readonly message: MessageService,
    private readonly confirm: ConfirmationService,
  ) {
    this.teamId$ = this.route.params.subscribe(params => this.teamId = params.id)
  }

  ngOnInit() {
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
  // section destruct
  ngOnDestroy() {
    this.teamId$?.unsubscribe()
    this.team$?.unsubscribe()
  }

  showDialog() {
    this.itemDialog = true
    this.email = null
  }

  hideDialog() {
    this.itemDialog = false
    this.email = null
  }

  saveItem() {
    this.submitted = true
    if(this.email) {
      this.team$ = this.teamService.addMember(this.teamId, this.email).subscribe(res => {
        this.team = res.data
        this.message.add({ severity: 'success', summary: 'Success', detail: 'Member added' })
      })
      this.hideDialog()
    }
  }
}
